const express = require("express");
const server = express.Router();

// import data and controllers
const data = require('../data');

console.log(data.list);
console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

module.exports = server;
