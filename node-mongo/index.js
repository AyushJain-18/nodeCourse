const MongoClient = require('mongodb');
const Assert = require('assert');

const mongoDBUrl = 'mongodb://localhost:27017';
const dbName = 'ConFusion';


MongoClient.connect(mongoDBUrl ,(err,client)=>{
    Assert.equal(err,null);
    console.log('connected correctlt to database');
    const db = client.db(dbName) // in last lecture we apply various operation on db 
            // here we gona apply those operation on this declared db variable

   const collection= db.collection('dishes')
   collection.insertOne({
        "name": "ayush jain",
        "age": "20"
    },(err , result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('After Insert \n',result.ops);
        }
    })
    collection.find({}).toArray((err , docs)=>{
        Assert.equal(err,null);
        console.log('FOUND!   \n' ,docs)
    })
    db.dropCollection('dishes', result => console.log('collection had been dropped with', result));
    client.close();
})