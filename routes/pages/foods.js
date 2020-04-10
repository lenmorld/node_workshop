const express = require('express');
const router = express.Router();

// db setup
const DbConnection = require('../../db');

// index (home) page for CRUD
router.get("/page/foods", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("foods");
	const foods = await dbCollection.find().toArray();

	res.render('foods/index', {
		foods: foods
	})
});

// Create page
router.get("/page/foods/new", async (req, res) => {
	res.render('foods/new');
});

// Edit page
router.get("/page/foods/edit/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("foods");
	const food = await dbCollection.findOne({ id: foodId });

	console.log(`Loading edit page of food ${foodId}`);

	res.render('foods/edit', {
		food: food
	});
});

// Detail page
router.get("/page/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("foods");
	const food = await dbCollection.findOne({ id: foodId });

	console.log(`Loading detail page of food ${foodId}`);

	res.render('foods/show', {
		food: food
	});
});

module.exports = router; 