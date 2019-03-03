// import built-in Node packages
const express = require('express'); // import express
const server = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const port = 4000;

// set the view engine to ejs
server.set('view engine', 'ejs');
// parse JSON (application/json content-type)
server.use(bodyParser.json());
// parse form data
server.use(bodyParser.urlencoded({ extended: false }));

// > cookie-session
server.set('trust proxy', 1) // trust first proxy
server.use(cookieSession({
	name: 'session',
	secret: 'secret_key',         // use 1 secret or keys array
	// keys: ['key1', 'key2'],    // always use keys[0] for signing cookies, others are used for verification
	httpOnly: true,   // false allows access using `document.cookie` but is not secure
}));

server.get("/", (req, res) => {
	// res.sendFile(__dirname + '/index.html');
	res.render("index");
});

server.get('/login_page', (req, res) => {
	res.render("login", { message: '' });
});

server.get('/register_page', (req, res) => {
	res.render("register");
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
		res.send("passwords don't match");
	}

	if (email && username && password && passwordConf) {
		res.render("login", { message: "Register success" } );
	} else {
		res.send("please fill in all the fields");
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

server.get("/json", ({ res }) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
