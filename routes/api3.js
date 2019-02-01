var axios = require('axios');
var express = require('express');
var api3 = express.Router();
var qs = require('qs');

// generated from Spotify Dev account Client ID, secret
var base64_auth_string = "NmNhYTc4N2YzZWY4NGQ0M2I1ZDVhYmQ0ZWY4ZjUyMjg6MjRlYjI4MzFiNjI0NDM3OGI2ODliOTc4OGEyZjhkMDc=";
var saved_access_token = null;

function getAccessToken() {

	return new Promise(function (resolve, reject) {
		if (saved_access_token) {
			console.log("[SPOTIFY] Using saved access token: ", saved_access_token);
			resolve(saved_access_token);
		} else {
			console.log("[SPOTIFY] Requesting a new access token... ");

			var url = 'https://accounts.spotify.com/api/token';
			var auth_data = {
				grant_type: 'client_credentials'
			};

			axios({
				method: 'POST',
				url: url,
				data: qs.stringify(auth_data),
				headers: {
					"Authorization": `Basic ${base64_auth_string}`,
					"Accept": "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				console.log("[SPOTIFY] Access token: ", response.data.access_token);
				saved_access_token = response.data.access_token;
				resolve(saved_access_token);
			}).catch(function (err) {
				reject(err);
			});
		}
	});
}

// /songs?search=___
api3.get("/songs", function (req, res) {
	var search = req.query.search;
	console.log(`[SPOTIFY] : searching ${search}...`);
	getAccessToken().then(function(access_token) {
			// TODO: send a GET request for search, attaching the access_token
			//				to prove we are verified API user
			
			// testing: send search, access_token to client
			res.send({ search: search, access_token: access_token });
	});
});

module.exports = api3;
