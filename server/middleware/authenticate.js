var {User} = require('./../models/user');

// middleware
var authenticate = (req,res,next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if(!user){
      // not a valid user
      return Promise.reject();
    }
    //res.send(user);
    req.user = user;
    req.token = token;
    next(); // if we dont call wont work
  }).catch((e) => { // not a valid token
    res.status(401).send();
  });
}


module.exports = {authenticate};
