/**
 * WIP: manually generating the POST data for oauth
 * 😢 CANT MAKE THIS WORK YET
 */
function getAuthRequestString() {
	const crypto = require('crypto');
	// let nonce = crypto.randomBytes(16).toString('base64');
	let nonce = crypto.randomBytes(16).toString('hex'); // so only a-f,0-9

	const encoded_callback = encodeURIComponent(request_token_callback)

	const timestamp = Date.now()

	// const signature = oauth_sign.hmacsign('POST', request_url,
	// 	{
	// 		oauth_callback: encoded_callback,
	// 		oauth_consumer_key: consumer_key,
	// 		oauth_nonce: nonce,
	// 		oauth_signature: 'HMAC-SHA1',
	// 		oauth_timestamp: timestamp,
	// 		oauth_version: '1.0'
	// 	},
	// 	consumer_secret)

	const signature = oauth_sign.sign(
		"HMAC-SHA1",
		'POST',
		request_url,
		{
			oauth_callback: request_token_callback,
			oauth_consumer_key: consumer_key,
			oauth_nonce: nonce,
			oauth_signature_method: "HMAC-SHA1",
			oauth_timestamp: "${timestamp}",
			oauth_version: "1.0"
		},
		consumer_secret)

	const encoded_signature = encodeURIComponent(signature)

	const string = `OAuth oauth_callback="${encoded_callback}",oauth_consumer_key="${consumer_key}",oauth_nonce="${nonce}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_version="1.0",oauth_signature="${encoded_signature}"`

	// const string = `OAuth oauth_nonce="${nonce}", oauth_callback="${callback}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_consumer_key="${consumer_key}", oauth_signature="${signature}", oauth_version = "1.0"`

	return string
}
server.get("/request_token", (req, res) => {
	const authString = getAuthRequestString()

	console.log(authString)

	const headers = {
		// 'Content-Type': 'application/json',
		// 'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: authString
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