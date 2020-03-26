const express = require('express');
const router = express.Router();

let foods = require('../foods');

// GET all foods
router.get("/foods", ({ res }) => {
	res.json(foods);
})

// GET one food identified by id
router.get("/foods/:id", (req, res) => {
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
router.post("/foods", (req, res) => {
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
router.put("/foods/:id", (req, res) => {
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
router.delete("/foods/:id", (req, res) => {
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

module.exports = router; 