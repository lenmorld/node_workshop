const express = require('express');
const router = express.Router();

// db setup
const DbConnection = require('../../db');

router.get("/page/users", async (req, res) => {
	const dbCollection = await DbConnection.getCollection("users");
	const users = await dbCollection.find().toArray();
	// res.json(products);

	res.render('users/index', {
		users: users
	})
});

router.get("/page/users/new", async (req, res) => {
	res.render('users/new');
});

module.exports = router; 