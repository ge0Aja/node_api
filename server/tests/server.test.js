const expect = require('expect');
const request = require('supertest');


const {app} = require('./../server.js');
const {ToDo} = require('./../models/todo.js');

//empty database ? if not delete everything
beforeEach((done) => {
  ToDo.remove({}).then(() => done());
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
      ToDo.find().then((todos) => {
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
        expect(todos.length).toBe(0);
      //  expect(todos[0].text).toBe(text);
        done();
      }).catch((err)=> done(err));
    });
  ///  done();
  });

});
