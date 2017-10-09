//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {
	if(err){
		return console.log("Unable to connect to test @ mongodb");
	}
	console.log("Connected");

	col = db.collection('Users');

	col.findOneAndUpdate({_id: new ObjectID("59d6150fc2884610581d9349")},
		{
			$set : {
				name : "GEOOOOO"
			},
			$inc : {
				age : +1
			}
		},{
			returnOriginal : false
		}).then((res) => {
		console.log(res);
	},(err) => {

	});
	db.close();	
});