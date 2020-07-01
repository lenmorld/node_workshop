// websocket setup
const WebSocket = require('ws');
const ws_port = 8080; // must match client
const wss = new WebSocket.Server({ port: ws_port });
let client_ctr = 0;
const clients = [];

function startWebSocket() {
	console.log(`[ws] WebSockets SERVER started. Waiting for clients on ${ws_port}`);

	const sendAll = (message, sender_id) => {
		console.log(`[ws] CLIENT ${sender_id} said: ${message}`);
		clients.forEach(client => {
			client.send(`CLIENT ${sender_id} said: ${message}`);
		});
	}

	// when a client connects
	wss.on('connection', ws => {
		console.log(`[ws] WebSockets Client connection`);
		client_ctr++;
		ws.id = client_ctr; // add an id to ws client
		clients.push(ws);   // add client to list

		console.log(`[ws] CLIENT ${client_ctr} connected`);

		// send to a client when they connect
		ws.send("WELCOME to the WS server!");

		// when receiving a message from any client, 
		// send to all clients
		ws.on('message', message => {
			sendAll(message, ws.id);
		});
	});
}

module.exports = {
	startWebSocket
}
