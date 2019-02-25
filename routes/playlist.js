const express = require('express');
const server = express.Router();

// import data and controllers
const data = require('../data');

// PLAYLIST ROUTES
server.get("/", (req, res) => {
	res.render("playlist/home", { items: data.list });
});

server.get("/create", (req, res) => {
	res.render("playlist/create");
});

server.get("/edit/:id", (req, res) => {
	const itemId = req.params.id;
	const item = data.list.find( _item => _item.id === itemId );

	res.render("playlist/edit", { item: item });
});

// playlist/items/:id
server.put("/items/:id", (req, res) => {
	// same as PUT /items/:id logic
	// TODO: refactor into a helper module

	const itemId = req.params.id;
	const item = req.body;
	const updatedListItems = [];
	data.list.forEach(oldItem => {
		if (oldItem.id === itemId) {
			updatedListItems.push(item);
		} else {
			updatedListItems.push(oldItem);
		}
	});
	data.list = updatedListItems;
	
	// redirect to playlist home page
	res.render("playlist/home", { items: data.list });
});

// playlist/items
server.post("/items", (req, res) => {
	// same as POST /items logic
	// TODO: refactor into a helper module

	const item = req.body;
	data.list.push(item);

	// redirect to playlist home page
	res.render("playlist/home", { items: data.list });
});

// we don't need a form for Delete, so no need for method-override
// what we do is a GET request but replicaing the logic in server.delete()
server.get("/delete/:id", (req, res) => {
	const itemId = req.params.id;
	console.log("Delete item with id: ", itemId);

	// filter list copy, by excluding item to delete
	const filteredList = data.list.filter(function (item) {
		return item.id !== itemId;
	});

	// replace old list with new one
	data.list = filteredList;

	// this is only used by the PLaylist page for now
	res.render("playlist/home", { items: data.list });
});

module.exports = server;
