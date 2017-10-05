//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {
	if(err){
		return console.log("Unable to connect to test @ mongodb");
	}
	console.log("Connected");

	col = db.collection('Users');

	col.find().toArray().then((docs) => {
		console.log(JSON.stringify(docs,undefined,2));
	},(err) => {
		console.log('aklna hawa');
	});

	// col = db.collection('Todos');	

	// col.find().count().then((count) => {
	// 	console.log(count);
	// },(err) => {
	// 	console.log('aklna hawa');
	// });
	db.close();	
});