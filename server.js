// import built-in Node packages
const express = require('express'); // import express
const server = express();
const bodyParser = require('body-parser');
<<<<<<< HEAD
const methodOverride = require('method-override');

// import route modules
const pages = require('./routes/pages');
const crud = require('./routes/crud');
const playlist = require('./routes/playlist');
const db_crud = require('./routes/db_crud');
const api1 = require('./routes/api1');
const api2 = require('./routes/api2');
const api3 = require('./routes/api3');

const port = 4000;

// serve static files like images, stylesheets, javascript
server.use(express.static(__dirname + '/public'));

=======
const cookieSession = require('cookie-session');

const port = 4000;

>>>>>>> a2.1
// set the view engine to ejs
server.set('view engine', 'ejs');
// parse JSON (application/json content-type)
server.use(bodyParser.json());
// parse form data
server.use(bodyParser.urlencoded({ extended: false }));
<<<<<<< HEAD
// method override to allow PUT, DELETE in EJS forms
server.use(methodOverride('_method'))

// websocket setup
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
let client_ctr = 0;
const clients = [];

console.log(`WS SERVER started`);

const sendAll = (message, sender_id) => {
    console.log(`CLIENT ${sender_id} said: ${message}`);
    clients.forEach( client => {
        client.send(`CLIENT ${sender_id} said: ${message}`);
    });
}

wss.on('connection', ws => {
    console.log(`WS SERVER started`);
    client_ctr++;
    ws.id = client_ctr; // add an id to ws client
    clients.push(ws);   // add client to list

    console.log(`CLIENT ${client_ctr} connected`);

    ws.send("WELCOME to the WS server!");
    ws.on('message', message => {
        sendAll(message, ws.id);
    });
});

// routes
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
=======

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
>>>>>>> a2.1
});

server.get("/json", ({ res }) => {
    res.send((JSON.stringify({ name: "Lenny" })));
});

// template pages
server.use("/pages", pages);
// crud
// server.use("/", crud);
// db crud
server.use("/", db_crud);
// playlist app
server.use("/playlist", playlist);
// APIs
server.use("/api1", api1);
server.use("/api2", api2);
server.use('/', api3);	// localhost:4000/

server.listen(port, () => { // Callback function in ES6
    console.log(`Server listening at ${port}`);
});
