var axios = require('axios');
var express = require('express');
var api1 = express.Router();

// external API routes

api1.get("/users/:id", function (req, res) {
	var id = req.params.id;
	axios(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});


//?description=____&location=_____&titleContains=___&companyContains=___
api1.get("/jobs", function (req, res) {
	var description = req.query.description;
	var location = req.query.location;
	var titleContains = req.query.titleContains;
	var year = req.query.year;

	axios(`https://jobs.github.com/positions.json?description=${description}&location=${location}`).then(response => {
		var results = response.data;

		var matches = results.filter(r => {
			return r.title.toLowerCase().includes(titleContains.toLowerCase()) && r.created_at.includes(year);
		})

		res.json(matches);
	}).catch(err => {
		throw err;
	});
});

module.exports = api1;
