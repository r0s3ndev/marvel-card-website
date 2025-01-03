const { MongoClient } = require('mongodb');
const db_uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
let db;

async function connectToDatabase() {
    if (db) {
        return db;
    }
    try {
        const client = new MongoClient(db_uri);
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db(dbName); 
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

async function closeDatabaseConnection() {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}
module.exports = { connectToDatabase, closeDatabaseConnection};
