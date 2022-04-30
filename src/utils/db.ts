const config = require('dotenv').config();
const mongoDB = require('mongodb');
const {MongoClient} = mongoDB.MongoClient;
const DB_STRING = process.env.DB_STRING
console.log(DB_STRING)
let _db;


const mongoConnect = (callback) => {
    MongoClient.connect(DB_STRING, (err, client) => {
        if (err) throw err
        console.log('Connected to DB');
        _db = client.db();
        callback(client)
    })
}

const getDb = () => {
    if (_db) return _db
    throw 'No DB found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
