const axios = require('axios');
const express = require('express');
const api1 = express.Router();

// external API routes

api1.get("/users/:id", (req, res) => {
	const id = req.params.id;
	axios(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = api1;
