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
