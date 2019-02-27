const axios = require('axios');
const express = require('express');
const api2 = express.Router();

const OMDB_API_KEY = `71050af8`;

// external API routes

// /movies?search=____
api2.get("/movies", function (req, res) {
	const search = req.query.search;
	axios(`http://www.omdbapi.com/?t=${search}&apikey=${OMDB_API_KEY}`).then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = api2;
