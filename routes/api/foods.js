const express = require('express');
const router = express.Router();
const cors = require('cors');

// import modules
const crudHelper = require('../../utils/crudHelper');
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
const DbConnection = require('../../db');

// allow CORS for all routes under this router
router.use(cors());

// render either JSON or EJS view depending on client's request headers
const renderFoodsJsonOrView = (req, res, foods) => {
	if (req.headers.accept.includes("html") || req.headers['user-agent'].includes("Mozilla")) {
		res.redirect('/page/foods')
	} else {
		res.json(foods);
	}
}

// GET all foods
router.get("/foods", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("foods");
	const foods = await dbCollection.find().toArray();
	renderFoodsJsonOrView(req, res, foods);
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

	const dbCollection = await DbConnection.getCollection("foods");
	let foods = await dbCollection.find().toArray();

	await dbCollection.insertOne({
		...newFood,
		id: crudHelper.getNextId(foods),
		createdAt: dateTimeHelper.getTimeStamp(),
	});

	// return updated list
	foods = await dbCollection.find().toArray();
	renderFoodsJsonOrView(req, res, foods);
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
	renderFoodsJsonOrView(req, res, foods);
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
	renderFoodsJsonOrView(req, res, foods);
});


module.exports = router; 