var axios = require('axios');
var express = require('express');
var api3 = express.Router();

var SpotifyHelper = require('../utils/SpotifyHelper');

// /songs?search=___
api3.get("/songs", function (req, res) {
	var search = req.query.search;
	SpotifyHelper.searchTrack(search).then(_res => {
		res.json(_res);
	}).catch(err => {
		throw err;
	});
});

module.exports = api3;
