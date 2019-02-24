// import built-in Node packages
const express = require('express'); // import express
const server = express();

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
server.get("/about", function (req, res) {
	res.render('about');
});

server.get("/info", function (req, res) {
	res.render('info', { message: 'Hello world' });
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
