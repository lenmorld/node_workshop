const express = require('express');
const api3 = express.Router();

const SpotifyHelper = require('../utils/SpotifyHelper');

// /songs?search=eastside
api3.get("/songs", (req, res) => {
	const search = req.query.search;
	SpotifyHelper.searchTrack(search).then(result => {
		res.json(result);
	}).catch(err => {
		console.log(`[SPOTIFY ERROR]: ${err}`);
		throw err;
	});
});

module.exports = api3;
