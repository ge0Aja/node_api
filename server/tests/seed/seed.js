const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const user1Id = new ObjectID();
const user2Id = new ObjectID();


const users = [{
  _id: user1Id,
  email: 'geo@ex.com',
  password: 'user1pass',
  tokens:[{
      access: 'auth',
      token: jwt.sign({_id: user1Id, access: 'auth'},'abc').toString()
    }]
  },{
    _id: user2Id,
    email: 'geo123@ex.com',
    password: 'user2pass'
  }];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

// we have to call done as the final then so we can continue
const populateUsers = (done) => {
  User.remove({}).then(()=> {
    var user1 = new User(users[0]).save();
    var user2 = new User(users[1]).save();

    return Promise.all([user1,user2])
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
