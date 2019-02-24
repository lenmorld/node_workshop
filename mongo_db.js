// import and use mongodb.MongoClient
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// CALLBACK VERSION
function initDb(dbConnectionUrl, successCallback, failureCallback) {
    MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);        // this should be "caught" by the calling function
        } else {
            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbInstance);
        }
    });
}

module.exports = { initDb };
