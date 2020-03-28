// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
server.use(body_parser.json()); // parse JSON (application/json content-type)

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

server.get("/foods", (req, res) => {
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
		res.json({
			error: "User not found"
		})
	} else {
		// SUCCESS!
		res.json(user);
	}
});

// POST (create) a user 
server.post("/users", (req, res) => {
	const user = req.body;
	console.log('Adding new user: ', user);

	if (!user.id) {
		res.json({
			error: "id required"
		})
	} else if (users.find(_user => _user.id === user.id)) {
		res.json({
			error: "User already exists"
		})
	} else {
		// SUCCESS!
		// add new user to users array
		users.push(user)

		// return updated list
		res.json(users);
	}
});

// PUT (update) a user
server.put("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const updatedUser = req.body;
	console.log("Editing user ", userId, " to be ", updatedUser);

	const updatedListUsers = [];
	let found = false;

	// loop through list to find and replace one user
	users.forEach(oldUser => {
		if (oldUser.id === userId) {
			found = true;
			// spread oldUser properties
			// then overwrite with user properties
			const modifiedUser = {
				...oldUser,
				...updatedUser
			};
			updatedListUsers.push(modifiedUser);
		} else {
			updatedListUsers.push(oldUser);
		}
	});

	if (!found) {
		res.json({
			error: 'User not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		users = updatedListUsers;

		// return updated list
		res.json(users);
	}
});

// DELETE a user
server.delete("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	console.log("Delete user with id: ", userId);

	// filter list copy, by excluding item to delete
	const filteredList = users.filter(_user => _user.id !== userId);

	if (filteredList.length === users.length) {
		res.json({
			error: 'User not found'
		})
	} else {
		// SUCCESS!
		users = filteredList;
		res.json(users);
	}
});


server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
