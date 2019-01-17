// import built-in Node package
var http = require('http');
var port = 4000;

 var server = http.createServer(function (req, res) { // Callback function
    // Response header
    res.writeHead(200, { "Content-Type": "text/plain" });
    // send response
    res.end("Hello World\n");
});

 server.listen(port, function () { // Callback function
    console.log(`Server listening at ${port}`);
});
