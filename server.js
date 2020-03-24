// import built-in Node packages
const express = require('express'); // import express
const server = express();

let users = require('./users');

console.log(users[0]);

const port = 4000;

// HTML routes
server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});

server.get("/page/about", (req, res) => {
	res.sendFile(__dirname + '/about.html');
});

// JSON routes
server.get("/json", ({ res }) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

server.get("/products", ({ res }) => {
	res.send(
		JSON.stringify(
			[
				{ id: 1, name: "toilet paper", brand: "X", price: 199.99 },
				{ id: 2, name: "hand sanitizer", brand: "Y", price: 299.99 }
			]
		)
	);
});

server.get("/foods", ({ res }) => {
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

// # Users REST API

// GET all users
server.get("/users", (req, res) => {
	res.json(users);
});

// GET one user identified by id
server.get("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const user = users.find(_user => _user.id === userId);
	if (!user) {
		res.status(404).json({
			error: "User not found"
		})
	} else {
		res.json(user);
	}
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
