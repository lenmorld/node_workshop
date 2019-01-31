var axios = require('axios');
var express = require('express');
var api1 = express.Router();

// external API routes

api1.get("/fakedata", function (req, res) {
	axios('https://jsonplaceholder.typicode.com/users/1').then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});

api1.get("/jobs", function (req, res) {
	axios('https://jobs.github.com/positions.json?description=javascript&location=montreal').then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = api1;