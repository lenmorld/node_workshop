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

//?description=javascript&location=montreal
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

//?description=javascript&location=montreal&titleContains=developer&year=2019
api1.get("/jobs2", function (req, res) {
	const { description, location, titleContains, year } = req.query;
	let requestUrl = "https://jobs.github.com/positions.json";

	if (description || location) {
		const descriptionParam = description ? `description=${description}&` : '';
		const locationParam = location ? `location=${location}&` : '';
		requestUrl = `${requestUrl}?${descriptionParam}${locationParam}`;
	}

	axios(requestUrl).then(response => {
		// psot-processing of results
		const results = response.data;
		const matches = results.filter(r => {
			const { title, created_at } = r;
			const titleParam = titleContains ? titleContains.toLowerCase() : '';
			const yearParam = year || '';
			return title.toLowerCase().includes(titleParam) && created_at.includes(yearParam);
		});
		res.json(matches);
	}).catch(err => {
		throw err;
	});
});

module.exports = api1;
