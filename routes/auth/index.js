const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

// import modules
const crudHelper = require('../../utils/crudHelper');
const dateTimeHelper = require('../../utils/dateTimeHelper');

// db setup
const DbConnection = require('../../db');

// configure session
router.use(cookieSession({
	name: 'nodeapp_session',
	secret: 'my_secret_key_1234',   // secret to sign and verify cookie values
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

	if (!userToAuth.username || !userToAuth.password) {
		return res.json({
			error: "Username and password required"
		})
	}

	console.log(`Authenticating ${userToAuth.username}`)

	// find user from DB
	// const userId = Number(userToAuth.id);
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

	// SUCCESSFUL LOGIN
	// set session to userId
	req.session.loggedInUser = {
		id: user.id,
		username: userToAuth.username
		// DONT put password in session
	}

	res.redirect('/page/foods');
});

module.exports = router; 