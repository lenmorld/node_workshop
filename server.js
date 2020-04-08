// import config file
const config = require('./config');

// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
const methodOverride = require('method-override');

server.use(body_parser.json()); // parse JSON (application/json content-type)

// method override to allow PUT, DELETE in HTML forms
server.use(methodOverride('_method'))

// set the view engine to ejs
server.set('view engine', 'ejs');

// expose static assets: CSS, JS files, images
server.use(express.static(__dirname + '/public'));

// import routers
const productsRouter = require('./routes/api/products');
const usersRouter = require('./routes/api/users');
const foodsRouter = require('./routes/api/foods');

// import routers for HTML views (pages)
const indexPages = require('./routes/pages/index');
const productsPages = require('./routes/pages/products');
const usersPages = require('./routes/pages/users');

const port = config.port || 4000;

// ### HTML and EJS routes ###
server.use("/", indexPages);
server.use("/", productsPages);
server.use("/", usersPages);

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
