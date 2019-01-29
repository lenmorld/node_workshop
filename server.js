// import built-in Node packages
var http = require('http');
var express = require('express'); // import express
var server = express();
var body_parser = require('body-parser');
var mongo_db = require('./mongo_db');
var axios = require('axios');

// import server modules
var data = require('./data');
// console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

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

     // db-based API CRUD routes

     // get all items
    server.get("/items", function(req, res) {
        db_collection.find().toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    });

    // get an item identified by id
    server.get("/items/:id", function(req, res) {
        var item_id = req.params.id;
        db_collection.findOne({ id: item_id }, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    // create/post new item
    server.post("/items", function(req, res) {
        var item = req.body;
        db_collection.insertOne(item, function(err, result) {
            if (err) throw err;
            // send back entire updated list after successful request
            db_collection.find().toArray(function(_err, _result) {
                if (_err) throw _err;
                res.json(_result);
            });
        });
    });

    // update an item
    server.put("/items/:id", function(req, res) {
        var item_id = req.params.id;
        var item = req.body;

        db_collection.updateOne({ id: item_id }, { $set: item }, function(err, result) {
            if (err) throw err;
            // send back entire updated list after successful request
            db_collection.find().toArray(function(_err, _result) {
                if (_err) throw _err;
                res.json(_result);
            });
        });
    });

    // delete item from list
    server.delete("/items/:id", function(req, res) {
        var item_id = req.params.id;
        db_collection.deleteOne({ id: item_id }, function(err, result) {
            if (err) throw err;
            // send back entire updated list after successful request
            db_collection.find().toArray(function(_err, _result) {
                if (_err) throw _err;
                res.json(_result);
            });
        });
    });
    
});

server.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });

server.get("/json", function(req, res) {
    res.send((JSON.stringify({ name: "Lenny" })));
});

// template pages
server.get("/about", function(req, res) {
    res.render('about');
 });

 server.get("/info", function(req, res) {
    res.render('info', { message: 'Hello world' });
 });

 // external API routes
 server.get("/fakedata", function(req, res) {
    axios('https://jsonplaceholder.typicode.com/users/1').then(response => {
        res.json(response.data);
    }).catch(err => {
        throw err;
    });;
 });

 server.get("/jobs", function(req, res) {
    axios('https://jobs.github.com/positions.json?description=javascript&location=montreal').then(response => {
        res.json(response.data);
    }).catch(err => {
        throw err;
    });;
 });

server.listen(port, function () { // Callback function
    console.log(`Server listening at ${port}`);
});
