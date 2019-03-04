const express = require('express');
const server = express.Router();

const bcrypt = require('bcrypt');

const users = [
	{
		id: 1,
		username: "lenny",
		password: "$2b$10$YK8Wgy5xIgb/mWVrSPFpS.Dpp28tACXCVIwO15qZo8Lxgza1Tc0/W",	// hashed password
		email: "lenmorld@example.com"
	},
];

// users in users
console.log(users);

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
		// hash password so we don't store it plaintext
		// perform sync. to simplify example

		// hashSync(plaintext, saltRounds)
		let hashedPassword = bcrypt.hashSync(password, 10);

		// add new user
		const newUser = {
			email: email,
			username: username,
			password: hashedPassword
		};

		users.push(newUser);

		// redirect to login
		res.render("login", { message: "Register success", bg: 'bg-success' } );
	} else {
		res.render("register", { message: 'Please fill in all the fields', bg: 'bg-warning' } );
	}
});

// POST - login
server.post('/login', (req, res) => {
	const { username, password } = req.body;

	const found = users.filter(user => {
		if (user.username === username) {
			// compare incoming password with saved hashed password
			if (bcrypt.compareSync(password, user.password)) {
				return true;
			} 
		}
		return false;
	});

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