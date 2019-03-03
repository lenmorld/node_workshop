const express = require('express');
const server = express.Router();

server.get("/", (req, res) => {
	res.render("index");
});

server.get('/login_page', (req, res) => {
	res.render("login", { message: '' });
});

server.get('/register_page', (req, res) => {
	res.render("register", { message: 'Complete the form and hit Submit', bg: 'bg-primary' } );
});

server.get('/secret_page', (req, res) => {
	if (req.session.username) {
		// render secret_page and pass session data
		// res.render('secret', { user_id: req.session.userId, views: req.session.views });
		res.render('secret', { username: req.session.username });
	} else {
		// NOT LOGGED IN YET, redirect to /login
		res.render("login", { message: "Login required to see secret page" } );
	}
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

	if (email && username && password && passwordConf) {
		res.render("login", { message: "Register success" } );
	} else {
		res.render("register", { message: 'Please fill in all the fields', bg: 'bg-warning' } );
	}
});

// POST - login
server.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (username === 'lenny' && password === '1234') {
		req.session.username = username;
		res.redirect('/secret_page');
	} else {
		res.render("login", { message: "Login failed" } );
	}
});


// GET - logout
server.get('/logout', (req, res) => {
	if (req.session) {
		// destroy cookie-session
		req.session = null;
		console.log("Successful logout");
		return res.render('index');
	}
});

module.exports = server;