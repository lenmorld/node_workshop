// import built-in Node packages
var http = require('http');
var express = require('express'); // import express
var server = express();

var port = 4000;

server.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });

server.get("/json", function(req, res) {
    res.send((JSON.stringify({ name: "Lenny" })));
});

server.listen(port, function () { // Callback function
    console.log(`Server listening at ${port}`);
});
