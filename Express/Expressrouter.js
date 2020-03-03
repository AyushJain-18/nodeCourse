const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 3000;
const hostName = 'localhost';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.all('/dishes',(req, res, next)=>{
res.statusCode = 200;
res.setHeader('content-type', 'text/plain');
// res.end('THIS IS DEFAULT APPLICABLE FOR ALL');
next();
})
app.get('/dishes',(req, res, next)=>{
    console.log("INSIDE GET REQUEST")
    res.end('WAIT , WILL GAVE YOU LIST OF ALL DISHES')
})
app.post('/dishes',(req, res, next)=>{
    console.log("INSIDE POST REQUEST", req.body.name)
    res.end('WE WILL ADD YOUR DISH with '+ req.body.name) 
    // NOTE HERE + WORK BUT COMMA DOSENOT WORK 

})
app.put('/dishes',(req, res, next)=>{
    console.log("INSIDE PUT REQUEST")
    res.end('SORRY , ALL DISHES CANNOT BE MODIFIED AT ONCE PLEASE SELECT ANY ONE')
})

app.delete('/dishes',(req, res, next)=>{
    console.log("INSIDE DELETE REQUEST")
        res.end('SORRY , ALL DISHES CANNOT BE DELETED AT ONCE PLEASE SELECT ANY ONE') 
})


app.get('/dishes/:dishid',(req, res, next)=>{
    console.log("INSIDE GET REQUEST")
    res.end('WAIT , WILL GAVE YOUR DISHES WITH DISHID'+ req.params.dishid)
})
app.post('/dishes/:dishid',(req, res, next)=>{
    console.log("INSIDE POST REQUEST", req.body.name)
    res.end('OPERATION NOT SUPPORTED  with DISHID '+ req.params.dishid) 
    // NOTE HERE + WORK BUT COMMA DOSENOT WORK 

})
app.put('/dishes/: dishid ',(req, res, next)=>{
    console.log("INSIDE PUT REQUEST")
    res.end(`your dish with id ${req.params.dishid} had been updated`);
})

app.delete('/dishes/:dishid',(req, res, next)=>{
    console.log("INSIDE DELETE REQUEST")
        res.end(`your dish had been deleted ${req.params.dishid}`) 
})



const server = http.createServer(app);
server.listen(port , hostName, ()=>{
    console.log('server is up and running');
})






