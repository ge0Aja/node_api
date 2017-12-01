const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const validator = require('validator');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

//overrided
UserSchema.methods.toJSON = function (){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
}

//arrow function do not bind this keyword
UserSchema.methods.generateAuthToken = function (){
  var user = this;
  var access = 'auth';

  var token = jwt.sign({_id: user._id.toHexString(), access},'abc').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token){
  var user = this;

  return user.update({
    $pull: {
        tokens:{
          token
        }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this; // model methods
  var decodedToken;

  try {
    decodedToken = jwt.verify(token,'abc');
  } catch (e) {
    return Promise.reject();
  }

  User.findOne({ // idont think it is needed to check everything
    '_id': decodedToken._id,
    'tokens.token': token, // to query a nested
    'tokens.access': 'auth'
  });

};

  UserSchema.statics.findByCredentials = function (email,password) {
  var User = this;

  return User.findOne({email}).then((user) =>{
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          //resolve
          resolve(user);
        }else{
          //reject
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  // ahve to add next for  the middleware to complete
  var user = this;

  //re hash if the password is moidfied

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err,hash) => {
        user.password = hash;
        next();
      });
    });
  }else {
    next();
  }

});

var User = mongoose.model('User', UserSchema);

module.exports = {User}
