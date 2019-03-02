// import built-in Node packages
const express = require('express'); // import express
const server = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// import route modules
const pages = require('./routes/pages');
const crud = require('./routes/crud');
const playlist = require('./routes/playlist');
const db_crud = require('./routes/db_crud');
const api1 = require('./routes/api1');
<<<<<<< HEAD
=======
const api2 = require('./routes/api2');
const api3 = require('./routes/api3');
>>>>>>> c4.7

const port = 4000;
<<<<<<< HEAD
=======

// serve static files like images, stylesheets, javascript
server.use(express.static(__dirname + '/public'));
>>>>>>> m4

// set the view engine to ejs
server.set('view engine', 'ejs');
// parse JSON (application/json content-type)
server.use(bodyParser.json());
// parse form data
server.use(bodyParser.urlencoded({ extended: false }));
// method override to allow PUT, DELETE in EJS forms
server.use(methodOverride('_method'))

// websocket setup
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
let client_ctr = 0;
const clients = [];

console.log(`WS SERVER started`);

const sendAll = (message, sender_id) => {
    console.log(`CLIENT ${sender_id} said: ${message}`);
    clients.forEach( client => {
        client.send(`CLIENT ${sender_id} said: ${message}`);
    });
}

wss.on('connection', ws => {
    console.log(`WS SERVER started`);
    client_ctr++;
    ws.id = client_ctr; // add an id to ws client
    clients.push(ws);   // add client to list

    console.log(`CLIENT ${client_ctr} connected`);

    ws.send("WELCOME to the WS server!");
    ws.on('message', message => {
        sendAll(message, ws.id);
    });
});

// routes
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.get("/json", ({ res }) => {
    res.send((JSON.stringify({ name: "Lenny" })));
});

// template pages
server.use("/pages", pages);
// crud
// server.use("/", crud);
// db crud
server.use("/", db_crud);
// playlist app
server.use("/playlist", playlist);
// APIs
server.use("/api1", api1);
server.use("/api2", api2);
server.use('/', api3);	// localhost:4000/

server.listen(port, () => { // Callback function in ES6
    console.log(`Server listening at ${port}`);
});
