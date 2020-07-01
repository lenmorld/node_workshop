// import config file
const config = require('./config');

// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
const methodOverride = require('method-override');

// websocket server
const webSockets = require("./ws_server")

server.use(body_parser.json()); // parse JSON (application/json content-type)
server.use(body_parser.urlencoded()) // parse HTML form data

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
const authRouter = require('./routes/auth/index');
const servicesRouter = require('./routes/services/api1');
const servicesRouter2 = require('./routes/services/api2');
const servicesRouter3 = require('./routes/services/api3');

// import routers for HTML views (pages)
const indexPages = require('./routes/pages/index');
const productsPages = require('./routes/pages/products');
const usersPages = require('./routes/pages/users');
const foodsPages = require('./routes/pages/foods');

const port = config.port || 4000;

// ### HTML and EJS routes ###
server.use("/", indexPages);
server.use("/", productsPages);
server.use("/", usersPages);
server.use("/", foodsPages);

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

// # Auth
server.use("/", authRouter);

// # services
server.use("/", servicesRouter);
server.use("/", servicesRouter2);
server.use("/", servicesRouter3);

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});

// web socket
webSockets.startWebSocket();