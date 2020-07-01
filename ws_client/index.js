// match port with ws server
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)

// event emmited when connected
connection.onopen = function () {
	document.getElementById("convo").innerHTML += `<br /> Connected to server`;
}

// event emmited when receiving message 
connection.onmessage = function (e) {
	console.log(`[SERVER]: ${e.data}`);
	document.getElementById("convo").innerHTML += `<br/>[SERVER]: ${e.data}`;
}

connection.onerror = function (error) {
	console.log(`WebSocket error: ${error}`)
}

// send input value on SEND button click
document.querySelector('button').addEventListener('click', function (event) {
	const message = document.getElementById('message').value
	connection.send(message);
})