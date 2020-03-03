const mongoClient = require('mongodb')
const operations = require('./operations-promise')

const dbURL = 'mongodb://localhost:27017';
const dbName = 'ConFusion';

const document = {
    "name": "Ayush Jain",
    "age": 24
};
const updateDocument = {
    "name": "Ayush",
    "age": 14
}
mongoClient.connect(dbURL).then((client) => {
    console.log('connected correctlt to database');
    const db = client.db(dbName);
    const collectionName = 'dishes'
    return operations.insertDocument(db, document, collectionName)
        .then((result) => {
            console.log("Insert Document:\n", result.ops);
            return operations.findDocuments(db, collectionName)
        }).catch(err => console.log(err))
        .then((docs) => {
            console.log("Found Documents:\n", docs);
            return operations.removeDocument(db, document, collectionName)
        }).then((result) => {
            console.log(" Removed  Document:\n", result.result);
            return operations.updateDocument(db, updateDocument, { "age": 44 }, collectionName)
        }).then((result) => {
            console.log("Update Document:\n", result.result);
            return db.dropCollection("dishes")
        }).then((result) => {
            console.log("Dropped Collection: ", result);
            client.close();
        })
}).catch(err => console.log(err))
