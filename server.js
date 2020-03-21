// import built-in Node packages
const express = require('express'); // import express
const server = express();

const port = 4000;

// HTML routes
server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// JSON routes
server.get("/json", ({ res }) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
