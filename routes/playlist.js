var express = require('express')
var server = express.Router();

// PLAYLIST ROUTES
server.get("/playlist", function(req, res) {
	res.render("playlist", { items: data.list });
});

server.get("/create", function(req, res) {
	res.render("create");
});

server.get("/edit/:id", function(req, res) {
	var item_id = req.params.id;
	var item = data.list.find(function(_item) {
			return _item.id === item_id;
	});

	res.render("edit", { item: item });
});

// we don't need a form for Delete, so no need for method-override
// what we do is a GET request but replicaing the logic in server.delete()
server.get("/delete/:id", function(req, res) {
	var item_id = req.params.id;
	console.log("Delete item with id: ", item_id);

	// filter list copy, by excluding item to delete
	var filtered_list = data.list.filter(function(item) {
			return item.id !== item_id;
	});

	// replace old list with new one
	data.list = filtered_list; 

	// this is only used by the PLaylist page for now
	res.render("playlist", {items: data.list});
});

module.exports = server;