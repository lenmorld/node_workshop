const axios = require('axios');
const express = require('express');
const api1 = express.Router();

// external API routes

api1.get("/users/:id", (req, res) => {
	const id = req.params.id;
	axios(`https://jsonplaceholder.typicode.com/users/${id}`).then(result => {
		res.json(result.data);
	}).catch(err => {
		throw err;
	});
});

api1.get("/jobs", function (req, res) {
	const { description, location } = req.query;
	let requestUrl = "https://jobs.github.com/positions.json";
	
	if (description || location) {
		const descriptionParam = description ? `description=${description}&` : '';
		const	locationParam = location ? `location=${location}&` : '';
		requestUrl = `${requestUrl}?${descriptionParam}${locationParam}`;
	}

	console.log(`Request: ${requestUrl}`);
	axios(requestUrl).then(result => {
		res.json(result.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = api1;
