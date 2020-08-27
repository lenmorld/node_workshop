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
// http://localhost:4000/services/jobs?location=remote&description=javascript&
// titleContains=developer&year=2020
router.get("/services/jobs", function (req, res) {
	const { description, location, titleContains, year } = req.query;
	let requestUrl = "https://jobs.github.com/positions.json";

	if (description || location) {
		const descriptionParam = description ? `description=${description}&` : '';
		const locationParam = location ? `location=${location}&` : '';
		requestUrl = `${requestUrl}?${descriptionParam}${locationParam}`;
	}

	axios(requestUrl).then(result => {
		// post-processing of results
		const results = result.data;
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

// JSON typicode: sample blog posts
router.get("/services/recipes", function (req, res) {
	const { i, q, t } = req.query;

	const ingredients = i ? `i=${i}` : ''
	const meal = q ? `q=${q}` : ''

	const query_params = [ingredients, meal].join('&')

	axios(`http://www.recipepuppy.com/api/?${query_params}`)
		.then(result => {
			const recipes = result.data.results;

			// if t is supplied
			// only show recipe w/ thumbnails if t="true"
			// case-insensitive using toLowerCase
			const filter_thumbnails = (t && t.toLowerCase() === "true")
			if (filter_thumbnails) {
				const items_with_thumbnail = recipes.filter(item => item.thumbnail)
				res.json(items_with_thumbnail)
			} else {
				res.json(recipes);
			}
		}).catch(err => {
			throw err;
		});
});

module.exports = router;