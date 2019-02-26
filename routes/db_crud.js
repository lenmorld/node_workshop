const express = require("express");
const server = express.Router();

const mongo_db = require('../mongo_db');

// mongoDB connection
const collectionName = 'items';
// CALLBACK VERSION
mongo_db.initDb(collectionName, function (dbCollection) {	// successCallback
	// db-based CRUD RESTful API routes

	// get all items
	server.get("/items", function (req, res) {
		dbCollection.find().toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		})
	});
}, function (err) {	// failureCallback
	throw (err);
});


module.exports = server;
