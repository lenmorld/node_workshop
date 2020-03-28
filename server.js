// import built-in Node packages
const express = require('express'); // import express
const server = express();

const port = 4000;

// HTML routes
server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});

// JSON routes
server.get("/json", (req, res) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

server.get("/products", (req, res) => {
	res.send(
		JSON.stringify(
			[
				{ id: 1, name: "toilet paper", brand: "X", price: 199.99 },
				{ id: 2, name: "hand sanitizer", brand: "Y", price: 299.99 }
			]
		)
	);
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
