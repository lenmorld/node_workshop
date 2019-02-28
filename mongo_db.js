// import and use mongodb.MongoClient
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// mLab credentials
const dbUser = "user1";
const dbPass = "pass1234";
const dbHost = "ds113765.mlab.com:13765";
const dbName = "node_workshop_db";

// CALLBACK VERSION
function initDb(dbCollectionName, successCallback, failureCallback) {
    const dbConnectionUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`;

    MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);        // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);

            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbCollection);
        }
    });
}

// PROMISE VERSION
const initDb2 = (dbCollectionName) => {
    const dbConnectionUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`;

    // function returns a promise that resolves to a mongodb instance
    return new Promise((resolve, reject) => {
        MongoClient.connect(dbConnectionUrl, (err, dbInstance) => {
            if (err) {
                console.log(`[MongoDB connection] ERROR: ${err}`);
                reject(err);        // this should be "caught" by the calling function
            } else {
                const dbObject = dbInstance.db(dbName);
                const dbCollection = dbObject.collection(dbCollectionName);
                console.log("[MongoDB connection] SUCCESS");
                resolve(dbCollection);
            }
        });
    });
}

module.exports = { initDb, initDb2 };
