const express = require('express');
const router = express.Router();

// import modules
const crudHelper = require('../../utils/crudHelper');
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
const DbConnection = require('../../db');

// Registration Page for Customers
router.get("/register", async (req, res) => {
	res.render('auth/register');
});

// Login Page for Customers
router.get("/login", async (req, res) => {
	res.render('auth/login');
});

// Registration handler
router.post('/register', async (req, res) => {
	const newUser = req.body;

	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({ id: newUser.id });

	if (user) {
		res.json({
			error: "User with given id already exists"
		})
	} else if (!newUser.username || !newUser.password || !newUser.confirm_password || !newUser.name) {
		res.json({
			error: "Username, Password and Name are required fields"
		})
	} else if (newUser.password !== newUser.confirm_password) {
		res.json({
			error: "Password and confirmation don't match"
		})
	} else {
		console.log('Registering new user: ', newUser);

		let users = await dbCollection.find().toArray();

		await dbCollection.insertOne({
			...newUser,
			id: crudHelper.getNextId(users),
			createdAt: dateTimeHelper.getTimeStamp(),
		});

		// redirect to login page
		res.redirect('login');
	}
});

// Login handler
router.post('/login', async (req, res) => {
	const userToAuth = req.body;
	console.log(userToAuth);
	res.json(userToAuth);
});

module.exports = router; 