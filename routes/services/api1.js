const axios = require('axios');
const express = require('express');
const router = express.Router();

// external API routes

// JSON typicode: sample blog posts
router.get("/services/posts/:id", function (req, res) {
	const id = req.params.id;
	axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
		.then(result => {
			res.json(result.data);
		}).catch(err => {
			throw err;
		});
});

// Github Jobs API
router.get("/services/jobs", function (req, res) {
	const { description, location } = req.query;
	let requestUrl = "https://jobs.github.com/positions.json";
	if (description || location) {
		const descriptionParam = description ? `description=${description}&` : '';
		const locationParam = location ? `location=${location}&` : '';
		requestUrl = `${requestUrl}?${descriptionParam}${locationParam}`;
	}
	console.log(`Request: ${requestUrl}`);
	axios(requestUrl).then(result => {
		res.json(result.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = router;