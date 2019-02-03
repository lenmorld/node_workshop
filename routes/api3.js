var axios = require('axios');
var express = require('express');
var api3 = express.Router();

var SpotifyHelper = require('../utils/SpotifyHelper');

// /songs?search=___
api3.get("/songs", function (req, res) {
	var search = req.query.search;
	console.log(`[SPOTIFY] : searching ${search}...`);
	SpotifyHelper.getAccessToken().then(function (access_token) {
		// send a GET request for search, attaching the access_token
		//				to prove we are verified API user

		var _url = `https://api.spotify.com/v1/search?query=${search}&type=track`;

		axios({
			method: 'GET',
			url: _url,
			headers: {
				"Authorization": `Bearer ${access_token}`,
				"Accept": "application/json"
			}
		}).then(function (_res) {
			// inspect response data
			// console.log(`search response: ${JSON.stringify(_res.data)}`);
			
			// prepare data so we only get the attributes we need
			var search_results = _res.data.tracks.items;
			var squashed_results = search_results.map(function(track) {
					return {
							id: track.id,
							artist: track.artists[0].name,
							album: track.album.name,
							title: track.name
					};
			});
			console.log(squashed_results);
			// res.send(_res.data.tracks.items);
			res.json(squashed_results);
			
		}).catch(function (err) {
			throw err;
		});

		// testing: send search, access_token to client
		// res.send({ search: search, access_token: access_token });
	});
});

module.exports = api3;
