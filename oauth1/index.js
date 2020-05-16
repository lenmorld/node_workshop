const port = 3001

// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
const oauth_sign = require('oauth-sign')
const axios = require('axios')
const request = require('request')
const qs = require('querystring')

server.use(body_parser.json()); // parse JSON (application/json content-type)
server.use(body_parser.urlencoded()) // parse HTML form data

server.set('view engine', 'ejs')

const request_url = `https://api.twitter.com/oauth/request_token`
const consumer_key = '8ZWnKZhuS6PGbGhizrGFVOy54'
const consumer_secret = 'WhDUjBtypCVfhEUt5T5Wp9T875JfEqjcFfGKKKc5S05MJScg0v'
// const request_token_callback = encodeURIComponent('http://localhost:3001/callback')
// const request_token_callback = encodeURIComponent('https://8c2545a5.ngrok.io/callback')

// const request_token_callback = 'https://8c2545a5.ngrok.io/callback'
const request_token_callback = 'http://localhost:3001/callback'


function getAuthRequestString() {
	const crypto = require('crypto');
	let nonce = crypto.randomBytes(16).toString('base64');

	const encoded_callback = encodeURIComponent(request_token_callback)

	const timestamp = Date.now()

	const signature = oauth_sign.hmacsign('POST', request_url,
		{
			oauth_callback: encoded_callback,
			oauth_consumer_key: consumer_key,
			oauth_nonce: nonce,
			oauth_signature: 'HMAC-SHA1',
			oauth_timestamp: timestamp,
			oauth_version: '1.0'
		},
		consumer_secret)

	const string = `OAuth oauth_nonce="${nonce}",oauth_callback="${encoded_callback}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}", oauth_consumer_key="${consumer_key}",oauth_signature="${signature}",oauth_version="1.0"`

	// const string = `OAuth oauth_nonce="${nonce}", oauth_callback="${callback}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_consumer_key="${consumer_key}", oauth_signature="${signature}", oauth_version = "1.0"`

	return string
}

server.get("/", (req, res) => {
	res.render('index')
})

/**
 * WIP: manually generating the POST data for oauth
 */
server.get("/request_token", (req, res) => {
	const authString = getAuthRequestString()

	console.log(authString)

	const headers = {
		// 'Content-Type': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': authString
	}

	axios.post(request_url, {}, {
		headers: headers
	})
		.then((response) => {
			// console.log("RESPONSE:", response)
			res.json({
				message: response
			})
		})
		.catch((error) => {
			// console.log("ERROR: ", error)
			res.json({
				error: error
			})
		})

})

/**
 * uses request's built-in OAuth1 signing, etc
 */
server.get("/request_token_2", (req, res) => {
	const oauth_step_1_data = {
		callback: request_token_callback
		, consumer_key: consumer_key
		, consumer_secret: consumer_secret
	}

	console.log(oauth_step_1_data)

	request.post({ url: request_url, oauth: oauth_step_1_data }, function (e, r, body) {
		if (e) {
			res.json({
				error: e
			})
		} else {
			const req_data = qs.parse(body)
			console.log(req_data.oauth_token)

			res.json({
				message: req_data
			})

			/*
				{"message":{"oauth_token":"ou1bcQAAAAABEanCAAABch18gx0","oauth_token_secret":"DGsdECfCMwFtaFmXFPSjXB2BWH2MNaCU","oauth_callback_confirmed":"true"}}
			*/
		}
	})
})

server.get("/callback", (req, res) => {
	console.log(req.query)
	res.json({
		"message": "callback"
	})
})

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
