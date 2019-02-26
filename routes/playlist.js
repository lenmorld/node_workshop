const express = require('express');
const server = express.Router();

// import data and controllers
// const data = require('../data');
const mongo_db = require('../mongo_db');
// mongoDB connection
const collectionName = 'items';

// TODO: some route handlers same logic as db_crud.js
//			refactor into a helper module

mongo_db.initDb2(collectionName).then(dbCollection => {
	// PLAYLIST ROUTES
	server.get("/", (req, res) => {
		dbCollection.find().toArray((err, result) => {
			if (err) throw err;
			// res.json(result);
			res.render("playlist/home", { items: result });
		});
	});

	server.get("/create", (req, res) => {
		res.render("playlist/create");
	});

	server.get("/edit/:id", (req, res) => {
		const itemId = req.params.id;
		dbCollection.findOne({ id: itemId }, function (err, result) {
			if (err) throw err;
			// res.json(result);
			res.render("playlist/edit", { item: result });
		});
	});

	// // playlist/items/:id
	server.put("/items/:id", (req, res) => {
		const item_id = req.params.id;
		const item = req.body;

		dbCollection.updateOne({ id: item_id }, { $set: item }, (err, result) => {
			if (err) throw err;
			// send back entire updated list, to make sure frontend data is up-to-date
			dbCollection.find().toArray( (_err, _result) => {
				if (_err) throw _err;
				// res.json(_result);
				res.render("playlist/home", { items: _result });
			});
		});
	});

	// playlist/items
	server.post("/items", (req, res) => {
		const item = req.body;
		dbCollection.insertOne(item, (err, result) => {
			if (err) throw err;
			// send back entire updated list after successful request
			dbCollection.find().toArray((_err, _result) => {
				if (_err) throw _err;
				// res.json(_result);
				res.render("playlist/home", { items: _result });
			});
		});
	});

	// we don't need a form for Delete, so no need for method-override
	// what we do is a GET request but replicaing the logic in server.delete()
	server.get("/delete/:id", (req, res) => {
		const item_id = req.params.id;
		dbCollection.deleteOne({ id: item_id }, (err, result) => {
			if (err) throw err;
			// send back entire updated list after successful request
			dbCollection.find().toArray(function (_err, _result) {
				if (_err) throw _err;
				// res.json(_result);
				res.render("playlist/home", { items: _result });
			});
		});
	});

});

	// form-submitted search
	server.post("/songs/search", function (req, res) {
		console.log(req.body);

		var search = req.body.search;
		SpotifyHelper.searchTrack(search).then(_res => {
			// res.json(_res);
			res.render("search", { items: _res, search: search });
		}).catch(err => {
			throw err;
		});
	});
}