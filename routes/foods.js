const express = require('express');
const router = express.Router();

// import modules
const dateTimeHelper = require('../utils/dateTimeHelper');

// db setup
const DbConnection = require('../db');

// GET all foods
router.get("/foods", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("foods");
	const foods = await dbCollection.find().toArray();
	res.json(foods);
});

// GET one food identified by id
router.get("/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("foods");
	const food = await dbCollection.findOne({ id: foodId });
	res.json(food);
});

// POST (create) a food 
router.post("/foods", async (req, res) => {
	const newFood = req.body;
	console.log('Adding new food: ', newFood);

	if (!newFood.id) {
		res.json({
			error: "id required"
		})
	}

	const dbCollection = await DbConnection.getCollection("foods");
	const food = await dbCollection.findOne({ id: newFood.id });

	if (food) {
		res.json({
			error: "Food with given id already exists"
		})
	} else {
		await dbCollection.insertOne({
			...newFood,
			createdAt: dateTimeHelper.getTimeStamp()
		});

		// return updated list
		const foods = await dbCollection.find().toArray();
		res.json(foods);
	}
});

// PUT (update) a food
router.put("/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	const updatedFood = req.body;
	console.log("Editing food ", foodId, " to be ", updatedFood);

	const dbCollection = await DbConnection.getCollection("foods");
	const food = await dbCollection.findOne({ id: foodId });

	if (!food) {
		res.json({
			error: "Food with given id doesn't exist"
		})
	}

	updatedFood.updatedAt = dateTimeHelper.getTimeStamp();
	await dbCollection.updateOne({ id: foodId }, { $set: updatedFood });

	// return updated list
	const foods = await dbCollection.find().toArray();
	res.json(foods);
});

// DELETE a food
router.delete("/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	console.log("Delete food with id: ", foodId);

	const dbCollection = await DbConnection.getCollection("foods");
	const food = await dbCollection.findOne({ id: foodId });

	if (!food) {
		res.json({
			error: "Food with given id doesn't exist"
		})
	}

	await dbCollection.deleteOne({ id: foodId });

	// return updated list
	const foods = await dbCollection.find().toArray();
	res.json(foods);
});


module.exports = router; 