var SpotifyHelper = require('../utils/SpotifyHelper');

// PLAYLIST ROUTES

exports.init_playlist_routes = function (server, db_collection) {

	server.get("/playlist", function(req, res) {
		db_collection.find().toArray(function (err, result) {
			if (err) throw err;
			res.render("playlist", { items: result });
		});
	});
	
	server.get("/create", function(req, res) {
		res.render("create");
	});
	
	server.get("/edit/:id", function(req, res) {
		var item_id = req.params.id;
		db_collection.findOne({ id: item_id }, function (err, result) {
			if (err) throw err;
			res.render("edit", { item: result });
		});
	});
	
	// we don't need a form for Delete, so no need for method-override
	// what we do is a GET request but replicaing the logic in server.delete()
	server.get("/delete/:id", function(req, res) {
		var item_id = req.params.id;
		db_collection.deleteOne({ id: item_id }, function (err, result) {
			if (err) throw err;
			// send back entire updated list after successful request
			db_collection.find().toArray(function (_err, _result) {
				if (_err) throw _err;
				res.render("playlist", {items: _result});
			});
		});
	});

	server.get("/search", function (req, res) {
		res.render("search", { items: [], search: '' });
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