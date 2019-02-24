const express = require("express");
const server = express.Router();

// import data and controllers
const data = require('../data');

console.log(data.list);
console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

// CRUD RESTful API routes
server.get("/items", (req, res) => {
	res.json(data.list);
});

module.exports = server;
