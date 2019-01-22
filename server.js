// import built-in Node package
var http = require('http');
var port = 4000;

var server = http.createServer(function (req, res) { // Callback function
    // Response header
    res.writeHead(200, { "Content-Type": "application/json" });

    // JSON object
    var song = {
        id: 12345,
        favorite: false,
        title: "Hello World",
        artist: "Node programmer",
        album: "Node EP"
    };

   // send JSON response to client
   res.end(JSON.stringify(song));      // JSON.stringify({a: 1}) -> '{"a":1}'
});

server.listen(port, function () { // Callback function
    console.log(`Server listening at ${port}`);
});
