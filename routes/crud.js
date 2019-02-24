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
	var item = req.body;
	console.log('Adding new item: ', item);

	// add new item to array
	data.list.push(item)

	// return updated list
	res.json(data.list);
});

module.exports = server;
