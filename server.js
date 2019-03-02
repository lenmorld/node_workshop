// import built-in Node packages
const express = require('express'); // import express
const server = express();

const port = 4000;

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

server.listen(port, () => { // Callback function in ES6
    console.log(`Server listening at ${port}`);
});
