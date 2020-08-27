// Public APIs that uses OAuth

// import config file
const config = require('../../config');

const axios = require('axios');
const express = require('express');
const router = express.Router();
const qs = require('qs');

// base_64_encode (spotify_client_id:spotify_client_secret)
const base64_auth_string = Buffer.from(`${config.spotify_client_id}:${config.spotify_client_secret}`)
	.toString('base64')

let saved_access_token = null;

// ES5 version: function getAccessToken() {...
const getAccessToken = () => {
	return new Promise((resolve, reject) => {
		if (saved_access_token) {
			console.log("[SPOTIFY] Using saved access token: ", saved_access_token);
			resolve(saved_access_token);
		} else {
			console.log("[SPOTIFY] Requesting a new access token... ");

			const url = 'https://accounts.spotify.com/api/token';
			const auth_data = {
				grant_type: 'client_credentials'
			};

			axios({
				method: 'POST',
				url: url,
				data: qs.stringify(auth_data),
				headers: {
					"Authorization": `Basic ${base64_auth_string}`,
					"Accept": "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
				}
			}).then(response => {
				console.log("[SPOTIFY] Access token: ", response.data.access_token);
				saved_access_token = response.data.access_token;
				resolve(saved_access_token);
			}).catch(err => reject(err));
		}
	});
}

// /songs?search=bad+guy
router.get("/services/songs", (req, res) => {
	const search = req.query.search;
	console.log(`[SPOTIFY] searching ${search}...`);
	getAccessToken().then((access_token) => {
		// send a GET request for search, attaching the access_token
		// to prove we are verified API user

		const _url = `https://api.spotify.com/v1/search?query=${search}&type=track`;

		axios({
			method: 'GET',
			url: _url,
			headers: {
				"Authorization": `Bearer ${access_token}`,
				"Accept": "application/json"
			}
		}).then(result => {
			// inspect response data
			console.log(">>>>>> search response <<<<<<<<")
			console.log(JSON.stringify(result.data));
			res.send(result.data.tracks.items);
			console.log(">>>> end of response <<<<<<")
		}).catch(err => {
			console.log(`[SPOTIFY ERROR]: ${err}`);
			throw err;
		});
	});
});

module.exports = router;