const express = require('express');
const router = express.Router();

// import modules
const crudHelper = require('../../utils/crudHelper');
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
const DbConnection = require('../../db');

// render either JSON or EJS view depending on client's request headers
const redirectToIndexOrReturnJson = (req, res, users) => {
	if (req.headers.accept.includes("html") && req.headers['user-agent'].includes("Mozilla")) {
		res.redirect('/page/users')
	} else {
		res.json(users);
	}
}

// GET all users
router.get("/users", async (req, res, next) => {
	const dbCollection = await DbConnection.getCollection("users");
	const users = await dbCollection.find().toArray();
	// redirectToIndexOrReturnJson(req, res, users);

	// user middleware
	res.locals.users = users;
	next();
}, redirectToIndexOrReturnJson);

// GET one user identified by id
router.get("/users/:id", async (req, res) => {
	const userId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: userId });
	res.json(user);
});

// POST (create) a user 
router.post("/users", async (req, res) => {
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
		redirectToIndexOrReturnJson(req, res, users);
	}
});

// PUT (update) a user
router.put("/users/:id", async (req, res) => {
	const userId = Number(req.params.id);
	const updatedUser = req.body;
	console.log("Editing user ", userId, " to be ", updatedUser);

	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: userId });

	if (!user) {
		res.json({
			error: "User with given id doesn't exist"
		})
	} else {
		updatedUser.updatedAt = dateTimeHelper.getTimeStamp();
		await dbCollection.updateOne({ id: userId }, { $set: updatedUser });

		// return updated list
		const users = await dbCollection.find().toArray();
		redirectToIndexOrReturnJson(req, res, users);
	}
});

// DELETE a user
router.delete("/users/:id", async (req, res) => {
	const userId = Number(req.params.id);
	console.log("Delete user with id: ", userId);

	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: userId });

	if (!user) {
		res.json({
			error: "User with given id doesn't exist"
		})
	} else {
		await dbCollection.deleteOne({ id: userId });

		// return updated list
		const users = await dbCollection.find().toArray();
		redirectToIndexOrReturnJson(req, res, users);
	}
});

module.exports = router; 