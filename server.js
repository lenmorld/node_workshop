// import built-in Node packages
var http = require('http');
var express = require('express'); // import express
var server = express();
var body_parser = require('body-parser');
var mongo_db = require('./mongo_db');

var api1 = require('./routes/api1');
var api2 = require('./routes/api2');

// import server modules
var data = require('./data');
// console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

// import routes
var crud = require('./routes/crud');
var main = require('./routes/main');

var port = 4000;

// set the view engine to ejs
server.set('view engine', 'ejs');

server.use(body_parser.json()); // parse JSON (application/json content-type)

// db connection
var db_user = "user1";
var db_pass = "pass1234";
var db_host = "ds113765.mlab.com:13765";
var db_name = "node_workshop_db";
var db_collection_name = "items";
var db_connection_url = `mongodb://${db_user}:${db_pass}@${db_host}/${db_name}`;
// console.log(db_connection_url);

mongo_db.init_db(db_connection_url).then(function(db_instance) {
    var db_object = db_instance.db(db_name);
    var db_collection = db_object.collection(db_collection_name);

    crud.init_db_routes(server, db_collection);
});

server.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });

server.use('/', main);     // localhost:4000/info
//  server.use('/pages', main);     // localhost:4000/pages

server.use('/', api1);      // localhost:4000/users/:id
server.use('/', api2);

server.listen(port, function () { // Callback function
    console.log(`Server listening at ${port}`);
});
