// import built-in Node packages
const express = require('express'); // import express
const server = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// import route modules
const pages = require('./routes/pages');
const crud = require('./routes/crud');
const playlist = require('./routes/playlist');
const db_crud = require('./routes/db_crud');
const api1 = require('./routes/api1');
const api2 = require('./routes/api2');

const port = 4000;

// set the view engine to ejs
server.set('view engine', 'ejs');
// parse JSON (application/json content-type)
server.use(bodyParser.json());
// parse form data
server.use(bodyParser.urlencoded({ extended: false }));
// method override to allow PUT, DELETE in EJS forms
server.use(methodOverride('_method'))

server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
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

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
