//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

//console.log(obj);
// in es6 instead of doing user.name 
// you can write var {name} = user;
// to get the user prop from the var user

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {
	if(err){
		return console.log("Unable to connect to test @ mongodb");
	}
	console.log("Connected");

	// var col  = db.collection('Todos');

	// col.insertOne({
	// 	text: 'To do Something',
	// 	isComplete : 'false'

	// },(err, result) => {
	// 	if(err){
	// 		return console.log("cannot insert",err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined,2));
	// });

	// var colU = db.collection('Users');

	// colU.insertOne({
	// 	name : 'Jul',
	// 	age : '25'
	// },(err,result) => {
	// 	if(err){
	// 		return console.log("cannot insert",err);
	// 	}
	// 	//console.log(JSON.stringify(result.ops, undefined,2));
	// 	//console.log(result); 
	// 	console.log(result.ops[0]._id.getTimestamp());
	// })
	 db.close();
});