const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

router.get("/page/about", (req, res) => {
	res.sendFile(process.cwd() + '/views/about.html');
});

module.exports = router; 