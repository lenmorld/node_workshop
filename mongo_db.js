// import and use mongodb.MongoClient
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

function init_db(db_connection_url) {
    // function returns a promise that resolves to a mongodb instance
    return new Promise(function(resolve, reject) {
        MongoClient.connect(db_connection_url, function(err, db_instance) {
            if (err) {
                console.log(`[MongoDB connection] ERROR: ${err}`);
                reject(err);        // this should be "caught" by the calling function
            }

            console.log("[MongoDB connection] SUCCESS");
            resolve(db_instance);
        });
    });
}

module.exports = { init_db };