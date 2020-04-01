const express = require('express');
const router = express.Router();

// import modules
const crudHelper = require('../utils/crudHelper');
const dateTimeHelper = require('../utils/dateTimeHelper');

let users = require('../users');

console.log(users[0]);

// db setup
const DbConnection = require('../db');

// GET all users
router.get("/users", (req, res) => {
	// ### C4_CHALLENGE ###
});

// GET one user identified by id
router.get("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: userId });
	res.json(user);
});

// POST (create) a user 
router.post("/users", (req, res) => {
	const newUser = req.body;
	console.log('Adding new user: ', newUser);

	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: newUser.id });

	if (user) {
		res.json({
			error: "User with given id already exists"
		})
	} else {
		let users = await dbCollection.find().toArray();

		await dbCollection.insertOne({
			...newUser,
			id: crudHelper.getNextId(users),
			createdAt: dateTimeHelper.getTimeStamp(),
		});

		// return updated list
		users = await dbCollection.find().toArray();
		res.json(users);
	}
});

// PUT (update) a user
router.put("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const updatedUser = req.body;
	console.log("Editing user ", userId, " to be ", updatedUser);

	// ### C4 CHALLENGE ###
});

// DELETE a user
router.delete("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	console.log("Delete user with id: ", userId);

	// ### C4 CHALLENGE ###
});

module.exports = router; 