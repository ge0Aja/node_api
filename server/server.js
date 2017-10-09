var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mong.js');
var {ToDo} = require('./models/todo');
var {User} = require('./models/user');

const PORT = 3000;
var app = express();


app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  //console.log(req.body);
  var todo = new ToDo({
    text : req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  })
});

app.get('/todos',(req,res)=>{
  ToDo.find().then((todos)=>{
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  })
});

app.listen(PORT,() => {
  console.log(`Server is Up on port ${PORT}`);
});


module.exports = {
  app
};
