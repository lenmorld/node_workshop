// import built-in Node package
const http = require('http');
const port = 4000;

const server = http.createServer((req, res) => { // Callback function in ES6
	// Response header
	res.writeHead(200, { "Content-Type": "text/html" });

	// send HTML response to client
	res.end("<h1>Hello World</h1>");
});

server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
