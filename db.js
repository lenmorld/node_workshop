// import config file
const config = require('./config');

// mongodb driver
const MongoClient = require("mongodb").MongoClient;

if (!config.mongo_db_connection_string) {
	throw Error("⚠ ⚠ ⚠ Put connection string from MongoDB Atlas in .env file ⚠ ⚠ ⚠")
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
		this.collections = {};
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
					this.db = dbObject;
					successCallback(dbObject);
				}
			});
		}
	}

	connectWithPromise() {
		if (this.db) {
			return Promise.resolve(this.db);
		} else {
			return new Promise((resolve, reject) => {
				MongoClient.connect(this.url, this.options, (err, dbInstance) => {
					if (err) {
						console.log(`[MongoDB connection] ERROR: ${err}`);
						// failureCallback(err); // caught by the calling function
						reject(err);
					} else {
						const dbObject = dbInstance.db(this.dbName);
						console.log("[MongoDB connection] SUCCESS");
						this.db = dbObject;
						// successCallback(dbObject);
						resolve(dbObject);
					}
				});
			})
		}
	}

	async getCollection(collectionName) {
		if (this.collections[collectionName]) {
			return this.collections[collectionName];
		} else {
			let dbObject;
			try {
				dbObject = await this.connectWithPromise();
			} catch (db_error) {
				throw db_error;
			}

			const dbCollection = dbObject.collection(collectionName);

			// TESTING: get all items in this collection and log
			dbCollection.find().toArray((err, result) => {
				if (err) throw err;
				// console.log(result);
			});

			this.collections[collectionName] = dbCollection;
			return dbCollection;
		}
	};
};

const dbConnection = new DbConnection();

module.exports = dbConnection;