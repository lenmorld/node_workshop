const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');

// import modules
const crudHelper = require('../../utils/crudHelper');
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
// const DbConnection = require('../../db');

// setup mongoose, which replaces direct Mongo connection
const config = require('../../config');
mongoose.connect(config.mongo_db_connection_string);

const Food = require('../../models/food')

// allow CORS for all routes under this router
router.use(cors());

// GET all foods
router.get("/foods", async (req, res) => {
	try {
		const foods = await Food.find()
		res.json(foods);
	} catch (err) {
		throw err;
	}
});

// GET one food identified by id
router.get("/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);

	try {
		const food = await Food.find({ id: foodId })
		res.json(food);
	} catch (err) {
		throw err;
	}
});

// POST (create) a food 

router.post("/foods", async (req, res) => {
	const newFood = req.body;
	console.log('Adding new food: ', newFood);

	let foods = await Food.find()
	const food = new Food({
		...newFood,
		id: crudHelper.getNextId(foods),
		createdAt: dateTimeHelper.getTimeStamp(),
	})

	try {
		await food.save()
		// return updated list
		try {
			foods = await Food.find()
			res.json(foods);
		} catch (err) {
			throw err;
		}
	} catch (err) {
		throw err
	}
});

// PUT (update) a food
router.put("/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	const updatedFood = req.body;
	console.log("Editing food ", foodId, " to be ", updatedFood);

	try {
		const result = await Food.updateOne({ id: foodId }, {
			...updatedFood,
			updatedAt: dateTimeHelper.getTimeStamp()
		})

		// result.nModified is number of modified items
		if (result.nModified === 0) {
			res.json({
				error: "Food with given id doesn't exist"
			})
		} else {
			// return updated list
			try {
				foods = await Food.find()
				res.json(foods);
			} catch (err) {
				throw err;
			}
		}
	} catch (err) {
		throw err;
	}
});

// DELETE a food
router.delete("/foods/:id", async (req, res) => {
	const foodId = Number(req.params.id);
	console.log("Delete food with id: ", foodId);

	try {
		const result = await Food.deleteOne({ id: foodId })

		console.log(result)
		// result.deletedCount is number of modified items
		if (result.deletedCount === 0) {
			res.json({
				error: "Food with given id doesn't exist"
			})
		} else {
			// return updated list
			try {
				foods = await Food.find()
				res.json(foods);
			} catch (err) {
				throw err;
			}
		}
	} catch (err) {
		throw err;
	}
});


module.exports = router; 