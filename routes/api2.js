const axios = require('axios');
const express = require('express');
const api2 = express.Router();

const OMDB_API_KEY = `71050af8`;
const GIPHY_API_KEY = `MPHyugKqout4DfiKhja9Oy33uLghaigg`

// /movies?search=black+panther
api2.get("/movies", (req, res) => {
	const search = req.query.search;
	axios(`http://www.omdbapi.com/?t=${search}&apikey=${OMDB_API_KEY}`).then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});

// /memes?search=spongebob&limit=5
api2.get("/memes", (req, res) => {
	const { search, limit } = req.query;
	axios(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${GIPHY_API_KEY}&limit=${limit}`).then(response => {
		res.json(response.data);
	}).catch(err => {
		throw err;
	});
});

module.exports = api2;
