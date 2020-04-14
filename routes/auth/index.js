const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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
		// remove confirm_password from object using ES6 rest operator
		const { confirm_password, password, ..._newUser } = newUser;

		console.log('Registering new user: ', _newUser);

		// generate password with salt
		const salt = await bcrypt.genSalt(10); // salt rounds
		const hashedPassword = await bcrypt.hash(password, salt);

		let users = await dbCollection.find().toArray();

		await dbCollection.insertOne({
			..._newUser,
			password: hashedPassword,
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

	if (!userToAuth.username || !userToAuth.password) {
		return res.json({
			error: "Username and password required"
		})
	}

	console.log(`Authenticating ${userToAuth.username}`)

	// find user from DB
	const dbCollection = await DbConnection.getCollection("users");
	const user = await dbCollection.findOne({
		username: userToAuth.username,
		password: userToAuth.password
	});

	if (!user) {
		return res.json({
			error: "Login failed"
		})
	}

	// compare incoming password with saved hashed password
	const isMatch = await bcrypt.compare(userToAuth.password, user.password);
	console.log(isMatch, userToAuth.password, user.password);
	if (isMatch) {
		res.json({
			message: "Login successful"
		})
	} else {
		res.json({
			message: "Login failed"
		})
	}
});

module.exports = router; 