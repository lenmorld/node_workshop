var express = require('express')
var server = express.Router();

server.get("/json", function(req, res) {
	res.send((JSON.stringify({ name: "Lenny" })));
});

// template pages
server.get("/about", function(req, res) {
	res.render('about');
});

server.get("/info", function(req, res) {
	res.render('info', { message: 'Hello world' });
});


module.exports = server;