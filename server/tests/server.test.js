const expect = require('expect');
const request = require('supertest');


const {app} = require('./../server.js');
const {ToDo} = require('./../models/todo.js');


//seed of dummy todos
const todos =[
  {
    text: "First"
  },
  {
    text: "Second"
  }
];

//empty database ? if not delete everything
beforeEach((done) => {
  ToDo.remove({}).then(() => {
    return ToDo.insertMany(todos);

  }).then(() => done());
});

describe('POST / todos',() => {
  it('should create a new todo',(done)=> {
    var text = 'Testing!';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      console.log(res.body.text);
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }
      ToDo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err)=> done(err));
    });
  ///  done();
  });


  it('should not create a new todo',(done)=> {
  //  var text = 'Testing!';

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    // .expect((res) => {
    //   console.log(res.body.text);
    //   expect(res.body.text).toBe(text);
    // })
    .end((err, res) => {
      if(err){
        return done(err);
      }
      ToDo.find().then((todos) => {
        expect(todos.length).toBe(2);
      //  expect(todos[0].text).toBe(text);
        done();
      }).catch((err)=> done(err));
    });
  ///  done();
  });
});



describe('Get the todos', ()=> {
  it('should get todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});
