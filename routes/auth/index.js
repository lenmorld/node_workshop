const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

// import config file
const config = require('../../config');

// import modules
const crudHelper = require('../../utils/crudHelper');
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
const DbConnection = require('../../db');

// configure session
router.use(cookieSession({
	name: 'nodeapp_session',
	secret: config.secret_key,   // secret to sign and verify cookie values
	httpOnly: true,   // false allows access using `document.cookie` but is not secure
}));


// Registration Page for Customers
router.get("/register", async (req, res) => {
	res.render('auth/register');
});

// Login Page for Customers
router.get("/login", async (req, res) => {
	res.render('auth/login');
});

// Protected page - only for Authenticated users' access
router.get("/resource", async (req, res) => {
	if (!req.session.loggedInUser) {
		res.redirect('/login');
	} else {
		const dbCollection = await DbConnection.getCollection("foods");
		const foods = await dbCollection.find().toArray();

		res.render('auth/resource', {
			foods: foods
		})
	}
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

		// generate password hash with salt
		const salt = await bcrypt.genSalt(10); // salt rounds
		const passwordHash = await bcrypt.hash(password, salt);

		let users = await dbCollection.find().toArray();

		await dbCollection.insertOne({
			..._newUser,
			password: passwordHash,
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
	});

	if (!user) {
		return res.json({
			error: "Login failed"
		})
	}

	// check if given password's hash matches the user password hash in the DB
	const isMatch = await bcrypt.compare(userToAuth.password, user.password);
	console.log(`Plain text: ${userToAuth.password}`)
	console.log(`Hash: ${user.password}`)
	console.log(`match: ${isMatch}`)

	if (isMatch) {
		// SUCCESSFUL LOGIN
		// set session to userId
		req.session.loggedInUser = {
			id: user.id,
			username: userToAuth.username
			// DONT put password in session
		}

		res.redirect('/resource');
	} else {
		res.json({
			message: "Login failed"
		})
	}
});

// Logout
router.get('/logout', (req, res) => {
	if (req.session.loggedInUser) {
		// destroy cookie
		// req.session.loggedInUser = null;
		req.session = null;
	}

	res.redirect('login');
});

module.exports = router; 