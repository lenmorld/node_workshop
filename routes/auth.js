const express = require('express');
const server = express.Router();

const data = require('../data');
// users in data.users
console.log(data.users);

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
	if (req.session.username) {
		res.render('secret', { username: req.session.username });
	} else {
		// NOT LOGGED IN YET, redirect to /login
		res.render("login", { message: "Login required to see secret page", bg: "bg-warning" } );
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

	if (email && username && password) {
		// add new user
		const newUser = {
			email: email,
			username: username,
			password: password
		};
		data.users.push(newUser);

		// redirect to login
		res.render("login", { message: "Register success", bg: 'bg-success' } );
	} else {
		res.render("register", { message: 'Please fill in all the fields', bg: 'bg-warning' } );
	}
});

// POST - login
server.post('/login', (req, res) => {
	const { username, password } = req.body;

	const found = data.users.filter(user => user.username === username && user.password === password);

	if (found.length) {
		req.session.username = username;
		res.redirect('/secret_page');
	} else {
		res.render("login", { message: "Login failed", bg: "bg-danger" } );
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