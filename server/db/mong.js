var  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ToDoApp'); // , { useMongoClient: true }
mongoose.Promise = global.Promise; // to be able to access Promise after db operations


module.exports = {
  mongoose
};
