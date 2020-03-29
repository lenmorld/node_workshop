// mongodb driver
const MongoClient = require("mongodb").MongoClient;

if (!process.env.MONGO_DB_CONNECTION_STRING) {
	throw Error("⚠ ⚠ ⚠ Put connection string from MongoDB Atlas in dbConnectionUrl ⚠ ⚠ ⚠")
}

class DbConnection {
	constructor() {
		this.db = null;
		this.dbName = "data";
		this.url = process.env.MONGO_DB_CONNECTION_STRING;
		this.options = {
			useNewUrlParser: true,
			useUnifiedTopology: true
		};
	}

	connectWithCallback(successCallback, failureCallback) {
		if (this.db) {
			successCallback(this.db);
		} else {
			MongoClient.connect(this.url, this.options, (err, dbInstance) => {
				if (err) {
					console.log(`[MongoDB connection] ERROR: ${err}`);
					failureCallback(err); // caught by the calling function
				} else {
					const dbObject = dbInstance.db(this.dbName);
					console.log("[MongoDB connection] SUCCESS");

					successCallback(dbObject);
				}
			});
		}
	}
};

const dbConnection = new DbConnection();

module.exports = dbConnection;