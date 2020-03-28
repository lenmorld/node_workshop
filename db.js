// mongodb driver
const MongoClient = require("mongodb").MongoClient;

// PUT CONNECTION STRING FROM MONGODB HERE
const dbConnectionUrl = "";

if (!dbConnectionUrl) {
	throw Error("⚠ ⚠ ⚠ Put connection string from MongoDB Atlas in dbConnectionUrl ⚠ ⚠ ⚠")
}

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const initialize = (
	dbName,
	dbCollectionName,
	successCallback,
	failureCallback
) => {
	MongoClient.connect(dbConnectionUrl, dbOptions, (err, dbInstance) => {
		if (err) {
			console.log(`[MongoDB connection] ERROR: ${err}`);
			failureCallback(err); // this should be "caught" by the calling function
		} else {
			const dbObject = dbInstance.db(dbName);
			const dbCollection = dbObject.collection(dbCollectionName);
			console.log("[MongoDB connection] SUCCESS");

			successCallback(dbCollection);
		}
	});
}

module.exports = {
	initialize
};