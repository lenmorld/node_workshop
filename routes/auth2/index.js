const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs')

// import env. variables
const config = require('../../config');

// app credentials
const CLIENT_ID = config.spotify_client_id
const CLIENT_SECRET = config.spotify_client_secret

// Spotify endpoints
const authorize_endpoint = "https://accounts.spotify.com/authorize"
const token_endpoint = 'https://accounts.spotify.com/api/token'
const user_info_endpoint = 'https://api.spotify.com/v1/me'

// --- Authorization code flow params ---
// this must be whitelisted in the Spotify dev app
const redirect_uri = 'http://localhost:4000/auth2/callback'
// scopes defined at https://developer.spotify.com/documentation/general/guides/scopes/
const scope = "user-library-read%20user-read-email%20user-follow-read"
// app-specific state that we want to persist on callback
const state = "foo=bar&fizz=buzz"

// build authorization string:
// https://accounts.spotify.com/authorize?client_id=CLIENT_ID&
// response_type=code&redirect_uri=REDIRECT_URI&scope=SCOPES&state=STATE

// redirect_uri, scope, and state values must be URLencoded
const authorization_url = `${authorize_endpoint}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`

// cached access token
// IMPROVEMENT: use a better cache or DB to persist between server reloads
let saved_access_token_payload = null;
let user_info;
let message;

function getAndRenderUserProfile(token_obj, res) {
	axios({
		method: 'GET',
		url: user_info_endpoint,
		headers: {
			"Authorization": `Bearer ${token_obj.access_token}`,
			"Accept": "application/json"
		}
	}).then(result => {
		console.log(result.data)

		user_info = result.data

		res.redirect('/auth2/user')
	})
}

router.get('/auth2/start', (req, res) => {
	// if token exists already, do the request
	if (saved_access_token_payload) {
		message = "Using cached token 🎁"
		console.log(message)
		getAndRenderUserProfile(saved_access_token_payload, res)
	} else {
		// STEP 1: direct user to Spotify login page
		message = ""
		res.render('auth2/start', {
			auth_url: authorization_url
		})
	}
})

// STEP 2
router.get('/auth2/callback', (req, res) => {
	console.log(req.query)

	// get code from query string
	const auth_code = req.query.code

	// STEP 2: send a request to exchange auth code with access token

	// base64(CLIENT_ID:CLIENT_SECRET)
	const base64_credentials = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64')

	axios({
		method: 'post',
		url: token_endpoint,
		data: qs.stringify({
			grant_type: 'authorization_code',
			code: auth_code,
			redirect_uri: redirect_uri,
		}),
		headers: {
			'Authorization': `Basic ${base64_credentials}`
		}
	}).then(result => {
		console.log(result.data)
		// cache entire response payload
		saved_access_token_payload = result.data;

		// STEP 3: send a request using access_token
		getAndRenderUserProfile(saved_access_token_payload, res)
	})
});

router.get('/auth2/user', (req, res) => {
	if (user_info) {
		res.render('auth2/user', {
			user: user_info,
			message: message
		})
	} else {
		res.redirect('/auth2/start')
	}
})

router.get('/auth2/logout', (req, res) => {
	// delete saved access token, thus
	// restarting Auth code flow
	saved_access_token_payload = null
	user_info = null

	res.redirect('/auth2/start')
})

module.exports = router; 