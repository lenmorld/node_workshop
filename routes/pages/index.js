const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.render('index')
});

router.get("/page/about", (req, res) => {
	res.render('about')
});

module.exports = router; 