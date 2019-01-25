// import built-in Node packages
var http = require('http');
var express = require('express'); // import express
var server = express();
var body_parser = require('body-parser');

// import server modules
var data = require('./data');
// console.log(`song: ${data.list[0].title} by ${data.list[0].artist}`);

var port = 4000;

// set the view engine to ejs
server.set('view engine', 'ejs');

server.use(body_parser.json()); // parse JSON (application/json content-type)

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

 // get all items
server.get("/list", function(req, res) {
    res.json(data.list);
});

// get an item identified by id
server.get("/list/:id", function(req, res) {
    var item_id = req.params.id;
    var item = data.list.find(function(_item) {
        return _item.id === item_id;
    });
    res.json(item);
});

// create/post new item
server.post("/list", function(req, res) {
    var item = req.body;
    console.log('Adding new item: ', item);

    // add new item to array
    data.list.push(item)
    
    // return updated list
    res.json(data.list);
});

// update an item
server.put("/list/:id", function(req, res) {
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

// delete item fro list
server.delete("/list/:id", function(req, res) {
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
