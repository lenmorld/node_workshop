const express = require('express');
const router = express.Router();

// import modules
const crudHelper = require('../utils/crudHelper');

let users = require('../users');

// GET all users
router.get("/users", (req, res) => {
	res.json(users);
});

// GET one user identified by id
router.get("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const user = users.find(_user => _user.id === userId);
	if (!user) {
		res.json({
			error: "User not found"
		})
	} else {
		// SUCCESS!
		res.json(user);
	}
});

// POST (create) a user 
router.post("/users", (req, res) => {
	const user = req.body;
	console.log('Adding new user: ', user);

	if (users.find(_user => _user.id === user.id)) {
		res.json({
			error: "User already exists"
		})
	} else {
		// SUCCESS!
		// add new user to users array
		users.push({
			...user,
			id: crudHelper.getNextId(users),
		})

		// return updated list
		res.json(users);
	}
});

// PUT (update) a user
router.put("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const updatedUser = req.body;
	console.log("Editing user ", userId, " to be ", updatedUser);

	const updatedListUsers = [];
	let found = false;

	// loop through list to find and replace one user
	users.forEach(oldUser => {
		if (oldUser.id === userId) {
			found = true;
			// spread oldUser properties
			// then overwrite with user properties
			const modifiedUser = {
				...oldUser,
				...updatedUser
			};
			updatedListUsers.push(modifiedUser);
		} else {
			updatedListUsers.push(oldUser);
		}
	});

	if (!found) {
		res.json({
			error: 'User not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		users = updatedListUsers;

		// return updated list
		res.json(users);
	}
});

// DELETE a user
router.delete("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	console.log("Delete user with id: ", userId);

	// filter list copy, by excluding item to delete
	const filteredList = users.filter(_user => _user.id !== userId);

	if (filteredList.length === users.length) {
		res.json({
			error: 'User not found'
		})
	} else {
		// SUCCESS!
		users = filteredList;
		res.json(users);
	}
});

module.exports = router; 