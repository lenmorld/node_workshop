const axios = require('axios');
const express = require('express');
const router = express.Router();

// external API routes
router.get("/services/posts/:id", function (req, res) {
	const id = req.params.id;
	axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
		.then(result => {
			res.json(result.data);
		}).catch(err => {
			throw err;
		});
});

module.exports = router;