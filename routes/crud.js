<<<<<<< HEAD
// db-based API CRUD routes
exports.init_db_routes = function (server, db_collection) {
	// get all items
	server.get("/items", function (req, res) {
		db_collection.find().toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		})
	});

	// get an item identified by id
	server.get("/items/:id", function (req, res) {
		var item_id = req.params.id;
		db_collection.findOne({ id: item_id }, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

	// create/post new item
	server.post("/items", function (req, res) {
		var item = req.body;
		db_collection.insertOne(item, function (err, result) {
			if (err) throw err;
			// send back entire updated list after successful request
			db_collection.find().toArray(function (_err, _result) {
				if (_err) throw _err;

				if (item.mode === "form") {
					// redirect to /playlist page
					res.redirect('/playlist');
				} else {
					res.json(_result);
				}
			});
		});
	});

	// update an item
	server.put("/items/:id", function (req, res) {
		var item_id = req.params.id;
		var item = req.body;

		db_collection.updateOne({ id: item_id }, { $set: item }, function (err, result) {
			if (err) throw err;
			// send back entire updated list after successful request
			db_collection.find().toArray(function (_err, _result) {
				if (_err) throw _err;

				if (item.mode === "form") {
					// redirect to /playlist page
					res.redirect('/playlist');
				} else {
					res.json(_result);
				}
			});
		});
	});

	// delete item from list
	server.delete("/items/:id", function (req, res) {
		var item_id = req.params.id;
		db_collection.deleteOne({ id: item_id }, function (err, result) {
			if (err) throw err;
			// send back entire updated list after successful request
			db_collection.find().toArray(function (_err, _result) {
				if (_err) throw _err;
				res.json(_result);
			});
		});
	});
}
=======
const express = require("express");
const server = express.Router();

// import data and controllers
const data = require('../data');

console.log(data.list);
console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

// CRUD RESTful API routes
server.get("/items", (req, res) => {
	res.json(data.list);
});

// get an item identified by id
server.get("/items/:id", (req, res) => {
	const itemId = req.params.id;
	const item = data.list.find( _item => _item.id === itemId );
	res.json(item);
});

// create/post new item
server.post("/items", (req, res) => {
	const item = req.body;
	console.log('Adding new item: ', item);

	// add new item to array
	data.list.push(item)

	// return updated list
	res.json(data.list);
});

// update an item
server.put("/items/:id", (req, res) => {
	const itemId = req.params.id;
	const item = req.body;

	console.log("Editing item: ", itemId, " to be ", item);

	// init new list that will hold new items
	const updatedListItems = [];
	/*
		 loop through all items
		 if old_item matches id of the updated one, replace it
		 else keep old_item
	*/
	data.list.forEach(oldItem => {
		if (oldItem.id === itemId) {
			updatedListItems.push(item);
		} else {
			updatedListItems.push(oldItem);
		}
	});

	// replace old list with new one
	data.list = updatedListItems;

	res.json(data.list);
});

// delete item from list
server.delete("/items/:id", (req, res) => {
	const { id } = req.params;
	const itemId = id;

	console.log("Delete item with id: ", itemId);

	// filter list copy, by excluding item to delete
	const filtered_list = data.list.filter(item => item.id !== itemId);

	// replace old list with new one
	data.list = filtered_list;

	res.json(data.list);
});

module.exports = server;
>>>>>>> c4.1
