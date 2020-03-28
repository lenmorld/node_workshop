// init. environment variables
const dotenv = require('dotenv');
dotenv.config();
console.log(`**ENV PORT: ${process.env.PORT} **`);
console.log(`**ENV NODE_ENV: ${process.env.NODE_ENV} **`);

// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
server.use(body_parser.json()); // parse JSON (application/json content-type)

// import routers
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');

const port = process.env.PORT;

// ### HTML routes ###
server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});

server.get("/page/about", (req, res) => {
	res.sendFile(__dirname + '/about.html');
});

// ### JSON routes ### 
server.get("/json", (req, res) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

// # Products REST API
server.use("/", productsRouter);

// # Foods REST API
server.use("/", foodsRouter);

// # Users REST API
server.use("/", usersRouter);

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
