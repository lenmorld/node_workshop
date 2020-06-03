const express = require('express');
const router = express.Router();

router.get("/page/products", (req, res) => {
	res.render('products')
});

module.exports = router; 