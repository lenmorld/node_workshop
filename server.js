// import built-in Node packages
const express = require('express'); // import express
const server = express();

const port = 4000;

server.get("/", ({res}) => {
    res.sendFile(__dirname + '/index.html');
 });

server.get("/json", ({res}) => {
    res.send((JSON.stringify({ name: "Lenny" })));
});

server.listen(port, () => { // Callback function
	console.log(`Server listening at ${port}`);
});
