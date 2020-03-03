const assert = require('assert');

exports.inserDocuments =(db, document, collectionName, callback)=> {
    const collection = db.collection(collectionName);
    collection.insert(document, (err, result)=>{
        assert.equal(err,null);
        console.log("Inserted " + result.result.n +
        " documents into the collection " + collectionName);
        callback(result);
    })
}

exports.findDocuments=(db, collectionName,callback)=>{
    const collecion = db.collection(collectionName);
    collecion.find({}).toArray((err, result)=>{
        assert.equal(err,null);
        callback(result);
    })
}

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);        
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result);        
    });
}