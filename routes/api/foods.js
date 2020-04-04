const express = require('express');
const router = express.Router();

let foods = require('../../foods');

// GET all foods
router.get("/foods", (req, res) => {

})

// GET one food identified by id
router.get("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	// ### C4 CHALLENGE ###
});

// POST (create) a food 
router.post("/foods", (req, res) => {
	const food = req.body;
	console.log('Adding new food: ', food);

	// ### C4 CHALLENGE ###
});

// PUT (update) a food
router.put("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	const updatedFood = req.body;
	console.log("Editing food ", foodId, " to be ", updatedFood);

	// ### C4 CHALLENGE ###
});

// DELETE a food
router.delete("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	console.log("Delete food with id: ", foodId);

	// ### C4 CHALLENGE ###
});

module.exports = router; 