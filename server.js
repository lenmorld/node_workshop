// import built-in Node packages
const express = require('express'); // import express
const server = express();

const port = 4000;

// websocket setup
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
let client_ctr = 0;

console.log(`WS SERVER started`);

wss.on('connection', function (ws) {
    console.log(`WS SERVER started`);
    client_ctr++;
    console.log(`CLIENT ${client_ctr} connected`);

    ws.send("WELCOME to the WS server!");
    ws.on('message', message => {
        console.log(`CLIENT ${client_ctr} said: ${message}`);
        ws.send(`${message.toUpperCase()}`);
    });
});

// routes
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.get("/json", ({ res }) => {
    res.send((JSON.stringify({ name: "Lenny" })));
});

server.listen(port, () => { // Callback function in ES6
    console.log(`Server listening at ${port}`);
});
