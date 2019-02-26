const express = require("express");
const server = express.Router();

const mongo_db = require('../mongo_db');

// mongoDB connection
const collectionName = 'items';
// CALLBACK VERSION
// mongo_db.initDb(collectionName, function (dbCollection) {	// successCallback
// 	// db-based CRUD RESTful API routes

// 	// get all items
// 	server.get("/items", function (req, res) {
// 		dbCollection.find().toArray(function (err, result) {
// 			if (err) throw err;
// 			res.json(result);
// 		})
// 	});
// }, function (err) {	// failureCallback
// 	throw (err);
// });

// PROMISE VERSION
mongo_db.initDb2(collectionName).then(dbCollection => {
	// db-based CRUD RESTful API routes

	// get all items
	server.get("/items", (req, res) => {
		dbCollection.find().toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		});
	});

	// get an item identified by id
	server.get("/items/:id", (req, res) => {
		const itemId = req.params.id;
		dbCollection.findOne({ id: itemId }, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

	// create/post new item
	server.post("/items", (req, res) => {
		var item = req.body;
		dbCollection.insertOne(item, (err, result) => {
			if (err) throw err;
			// send back entire updated list after successful request
			dbCollection.find().toArray((_err, _result) => {
				if (_err) throw _err;
				res.json(_result);
			});
		});
	});

}).catch(err => {
	throw (err);
});

module.exports = server;
