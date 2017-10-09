var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email :{
    type: String,
    minlength: 1,
    lowercase: true,
    trim: true,
    required: true,
    validate: {
          validator: function(v) {
            return /\w+@\w+\.[a-z]{2,}/.test(v);
          },
          message: '{VALUE} is not a valid email'
    },
  },
});

module.exports = {
  User
}
