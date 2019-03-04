const express = require('express');
const server = express.Router();

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ssshhhhitsasecret';

server.get("/", (req, res) => {
	res.render("index");
});

server.get('/login_page', (req, res) => {
	res.render("login", { message: '', bg: 'bg-primary' });
});

server.get('/register_page', (req, res) => {
	res.render("register", { message: 'Complete the form and hit Submit', bg: 'bg-primary' } );
});

server.get('/secret_page', (req, res) => {
	res.render("login", { message: "Token in headers required to see secret page", bg: "bg-warning" } );
});

// POST - register user
server.post('/register', (req, res) => {
	const { email, username, password, passwordConf } = req.body;
	// confirm password
	if ((password && passwordConf) && password !== passwordConf) {
		const err = new Error('Passwords do not match');
		err.status = 400;
		res.render("register", { message: "Passwords don't match", bg: 'bg-warning' } );
	}

	if (email && username && password) {
		// JWT: [1] create token from user details
		const payload = { username: username };
		const token = jwt.sign(payload, JWT_SECRET, {
			expiresIn: '24h'
		});

		// JWT: [2] send token to user
		res.render("token", { token: token });
	} else {
		res.render("register", { message: 'Please fill in all the fields', bg: 'bg-warning' } );
	}
});

// POST - login
server.post('/login', (req, res) => {
	const { tokenFromUserForm } = req.body;

	// JWT: [3] verify token sent by user
	// if verified, grant access to secret page

	let token;

	// >> when using cURL or Postman, token must be attached in these headers
	// console.log(req.headers);
	const tokenFromHeaders = req.headers['x-access-token'] || req.headers['authorization'];

	// since we're allowing user to log-in via supplied token when they registered
	// get token from form
	if (tokenFromHeaders) {
		const tokenString = tokenFromHeaders.split("Bearer ")[1];
		token = tokenString;
	} else {
		token = tokenFromUserForm;
	}
	console.log(token);

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(401);
			res.render("login", { message: "Login failed. Token not valid", bg: "bg-danger" });
		} else {
			// iat is "Issued At", exp is "Expires In"
			const expiresIn = new Date(Number(decoded.exp) * 1000);
			console.log(JSON.stringify(decoded));
			res.render("secret", { expiry: expiresIn });
		}
	});
});


// GET - logout
server.get('/logout', (req, res) => {
	res.render("login", { message: 'No need to logout when using tokens.' + 
												'As long as token is valid, its fine' + 
												'However, it is possible to save token in localStorage and delete it on logout' + 
												' for use cases of token-based access to multiple pages or a webapp',
				bg: 'bg-primary' });
});

module.exports = server;