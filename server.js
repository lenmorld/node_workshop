// import built-in Node packages
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// import routes, controllers, data
const auth = require('./routes/auth');

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

// auth routes
server.use("/", auth);

server.get("/json", ({ res }) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
