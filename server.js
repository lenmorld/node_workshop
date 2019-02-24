// import built-in Node packages
const express = require('express'); // import express
const server = express();

// import server modules
const data = require('./data');
console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

const port = 4000;

// import route modules
const pages = require('./routes/pages');

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

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
