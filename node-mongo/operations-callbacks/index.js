const assert = require('assert');
const mongoClient = require('mongodb')
const operations = require('./operations')

const dbURL = 'mongodb://localhost:27017';
const dbName = 'ConFusion';

const document = {
    "name": "Ayush Jain",
    "age": 24
};
const updateDocument ={
    "name":"Ayush",
    "age":14
}
mongoClient.connect(dbURL, (error, client) => {
    assert.equal(error, null);
    console.log('connected correctlt to database');
    const db = client.db(dbName);
    const collectionName = 'dishes'
    operations.inserDocuments(db, document, collectionName, (result) => {
        console.log("Insert Document:\n", result.ops);
        operations.findDocuments(db, collectionName, (docs) => {
            console.log("Found Documents:\n", docs);
            operations.removeDocument(db, document, collectionName, (result) => {
                console.log(" Removed  Document:\n", result.result);
                operations.updateDocument(db, updateDocument, { "age": 44 }, collectionName, (result) => {
                    console.log("Update Document:\n", result.result);
                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);
                        client.close();
                    });
                })
            })
        })
    })
})
