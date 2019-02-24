// import built-in Node packages
const express = require('express'); // import express
const server = express();

// import route modules
const pages = require('./routes/pages');
const crud = require('./routes/crud');

const port = 4000;

// set the view engine to ejs
server.set('view engine', 'ejs');

server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/json", ({ res }) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

// template pages
server.use("/pages", pages);

// crud
server.use("/", crud);

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
