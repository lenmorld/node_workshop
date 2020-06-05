// Pubic APIs that needs an API key

// import config file
const config = require('../../config');

const axios = require('axios');
const express = require('express');
const router = express.Router();

const OMDB_API_KEY = config.omdb_api_key;
const GIPHY_API_KEY = config.giphy_api_key;

// /services/movies ? search = tiger + king
router.get("/services/movies", (req, res) => {
	const search = req.query.search;
	axios(`http://www.omdbapi.com/?t=${search}&apikey=${OMDB_API_KEY}`).then(result => {
		res.json(result.data);
	}).catch(err => {
		throw err;
	});
});

// services/memes?search=spongebob&limit=5
router.get("/services/memes", (req, res) => {
	const { search, limit } = req.query;
	axios(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${GIPHY_API_KEY}&limit=${limit}`).then(result => {
		res.json(result.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = router;