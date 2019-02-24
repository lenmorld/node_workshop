// import built-in Node package
const http = require('http');
const port = 4000;

const server = http.createServer(function (req, res) { // Callback function
	// Response header
	res.writeHead(200, { "Content-Type": "text/plain" });
	// send response
	res.end("Hello World\n");
});

server.listen(port, function () { // Callback function
	console.log(`Server listening at ${port}`);
});
