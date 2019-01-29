// import built-in Node packages
var http = require('http');
var express = require('express'); // import express
var server = express();
var body_parser = require('body-parser');
var mongo_db = require('./mongo_db');

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

 // API CRUD routes

// update an item
server.put("/items/:id", function(req, res) {
    var item_id = req.params.id;
    var item = req.body;

    console.log("Editing item: ", item_id, " to be ", item);

    // init new list that will hold new items
    var updated_list_items = [];
    /*
        loop through all items
        if old_item matches id of the updated one, replace it
        else keep old_item
    */
    data.list.forEach(function (old_item) {
        if (old_item.id === item_id) {
            updated_list_items.push(item);
        } else {
            updated_list_items.push(old_item);
        }
    });

    // replace old list with new one
    data.list = updated_list_items;

    res.json(data.list);
});

// delete item from list
server.delete("/items/:id", function(req, res) {
    var item_id = req.params.id;
    console.log("Delete item with id: ", item_id);

    // filter list copy, by excluding item to delete
    var filtered_list = data.list.filter(function(item) {
        return item.id !== item_id;
    });

    // replace old list with new one
    data.list = filtered_list; 

    res.json(data.list);
});

server.listen(port, function () { // Callback function
    console.log(`Server listening at ${port}`);
});
