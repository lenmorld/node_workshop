// import built-in Node packages
const express = require('express'); // import express
const server = express();

const clients = require('./clients');

console.log(clients[0]);

const port = 4000;

server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/json", ({ res }) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

server.get("/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});

server.get("/api/items", ({ res }) => {
	res.send(
		JSON.stringify(
			[
				{ id: 1, name: "toilet paper", brand: "X", price: 199.99 },
				{ id: 2, name: "hand sanitizer", brand: "Y", price: 299.99 }
			]
		)
	);
});

server.get("/api/foods", ({ res }) => {
	res.send(
		JSON.stringify(
			[
				{
					"id": 1,
					"name": "burger",
					"picture": "🍔",
					"price": "$4.50"
				},
				{
					"id": 2,
					"name": "pizza",
					"picture": "🍕",
					"price": "$2.50"
				},
				{
					"id": 3,
					"name": "ramen",
					"picture": "🍜",
					"price": "$5.50"
				}
			]
		)
	)
})

// Users CRUD
server.get("/users", (req, res) => {
	res.json(clients);
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
