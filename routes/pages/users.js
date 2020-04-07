const express = require('express');
const router = express.Router();

// db setup
const DbConnection = require('../../db');

// index (home) page for CRUD
router.get("/page/users", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("users");
	const users = await dbCollection.find().toArray();

	res.render('users/index', {
		users: users
	})
});

// Create page
router.get("/page/users/new", async (req, res) => {
	res.render('users/new');
});

// Edit page
router.get("/page/users/edit/:id", async (req, res) => {
	const userId = Number(req.params.id);
	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: userId });

	console.log(`Loading edit page of user ${userId}`);

	res.render('users/edit', {
		user: user
	});
});

module.exports = router; 