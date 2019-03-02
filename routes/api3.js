<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const axios = require('axios');
=======
>>>>>>> m4
const express = require('express');
const api3 = express.Router();

const SpotifyHelper = require('../utils/SpotifyHelper');

// /songs?search=eastside
api3.get("/songs", (req, res) => {
	const search = req.query.search;
<<<<<<< HEAD
	console.log(`[SPOTIFY] : searching ${search}...`);
	getAccessToken().then( access_token => {
		// send a GET request for search, attaching the access_token
		//				to prove we are verified API user

		const _url = `https://api.spotify.com/v1/search?query=${search}&type=track`;

		axios({
			method: 'GET',
			url: _url,
			headers: {
				"Authorization": `Bearer ${access_token}`,
				"Accept": "application/json"
			}
		}).then( _res => {
			// inspect response data
			// console.log(`search response: ${JSON.stringify(_res.data)}`);

			// "massage" data so we only get the attributes we need
			const search_results = _res.data.tracks.items;
			const squashed_results = search_results.map( track => {
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

		}).catch( err => {
			console.log(`[SPOTIFY ERROR]: ${err}`);
			throw err;
		});

		// testing: send search, access_token to client
		// res.send({ search: search, access_token: access_token });
>>>>>>> c4.7
=======
	SpotifyHelper.searchTrack(search).then(result => {
		res.json(result);
	}).catch(err => {
		console.log(`[SPOTIFY ERROR]: ${err}`);
		throw err;
>>>>>>> m4
	});
});

module.exports = api3;
