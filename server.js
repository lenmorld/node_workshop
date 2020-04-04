// init. environment variables
const dotenv = require('dotenv');
dotenv.config();
if (!process.env.PORT) {
	console.error("*****.env file missing! See README.md *****")
} else {
	console.log(`*****ENV PORT: ${process.env.PORT} *****`);
}

// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
server.use(body_parser.json()); // parse JSON (application/json content-type)

// import JSON files
let foods = require('./foods');

// import routers
const productsRouter = require('./routes/api/products');
const usersRouter = require('./routes/api/users');

const port = process.env.PORT || 4000;

// ### HTML routes ###
server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});

server.get("/page/about", (req, res) => {
	res.sendFile(__dirname + '/about.html');
});

// ### JSON routes ### 
server.get("/json", (req, res) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

// # Products REST API
server.use("/", productsRouter);

// # Foods REST API


// GET all foods
server.get("/foods", (req, res) => {
	res.json(foods);
})

// GET one food identified by id
server.get("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	const food = foods.find(_food => _food.id === foodId);
	if (!food) {
		res.json({
			error: "Food not found"
		})
	} else {
		// SUCCESS!
		res.json(food);
	}
});

// POST (create) a food 
server.post("/foods", (req, res) => {
	const food = req.body;
	console.log('Adding new food: ', food);

	if (!food.id) {
		res.json({
			error: "id required"
		})
	} else if (foods.find(_food => _food.id === food.id)) {
		res.json({
			error: "Food already exists"
		})
	} else {
		// SUCCESS!
		// add new food to foods array
		foods.push(food)

		// return updated list
		res.json(foods);
	}
});

// PUT (update) a food
server.put("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	const updatedFood = req.body;
	console.log("Editing food ", foodId, " to be ", updatedFood);

	const updatedListFoods = [];
	let found = false;

	// loop through list to find and replace one food
	foods.forEach(oldFood => {
		if (oldFood.id === foodId) {
			found = true;
			// spread oldFood properties
			// then overwrite with food properties
			const modifiedFood = {
				...oldFood,
				...updatedFood
			};
			updatedListFoods.push(modifiedFood);
		} else {
			updatedListFoods.push(oldFood);
		}
	});

	if (!found) {
		res.json({
			error: 'Food not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		foods = updatedListFoods;

		// return updated list
		res.json(foods);
	}
});

// DELETE a food
server.delete("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	console.log("Delete food with id: ", foodId);

	// filter list copy, by excluding item to delete
	const filteredList = foods.filter(_food => _food.id !== foodId);

	if (filteredList.length === foods.length) {
		res.json({
			error: 'Food not found'
		})
	} else {
		// SUCCESS!
		foods = filteredList;
		res.json(foods);
	}
});

// # Users REST API
server.use("/", usersRouter);

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
