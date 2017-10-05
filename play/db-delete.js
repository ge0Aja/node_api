//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {
	if(err){
		return console.log("Unable to connect to test @ mongodb");
	}
	console.log("Connected");

	col = db.collection('Todos');

	col.findOneAndDelete({text: "eat shit"}).then((res) => {
		console.log(res);
	},(err) => {

	});
	//db.close();	
});