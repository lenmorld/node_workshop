const express = require('express');
const server = express.Router();

server.get("/about", (req, res) => {
	res.render('about');
});

server.get("/info", (req, res) => {
	res.render('info', { message: 'Hello world' });
});

module.exports = server;
