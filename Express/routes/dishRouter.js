
const express = require('express');
const bodyParser = require('body-parser');

 
const dishRouter = express.Router();  // to make dishRouter a router;
dishRouter.use(bodyParser.json()); // TO USE ANY MIDDELWARE WE WILL USE();

dishRouter.route('/')
.all((req, res, next)=>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        next();
})
.get((req,res, next)=>{
    res.end('DISPLAYING ALL DISHESH TO YOU')
})
.post((req,res, next)=>{
    res.end(`ADDING YOUR DISH with name ${req.body.name} and discription is ${req.body.description}`)
})
.put((req,res, next)=>{
    res.end('CANNOT MODIFIED ALL DISHES')
})
.delete((req,res, next)=>{
    res.end('ALL DISHESH HAD BEEN DELETED');
})



dishRouter.route('/:dishid')
.get(function (req,res, next){
    res.end('DISPLAYING DISH with dishID'+ req.params.dishid)
})
.post((req,res, next)=>{
    res.end(`POST OPERATION IS NOT SUPPORTED`)
})
.put((req,res, next)=>{
    res.end('DISH WITH dish id :-'+req.params.dishid +'HAD BEEN MODIFIED ')
})
.delete((req,res, next)=>{
    res.end(`DISH WITH dishID:- ${req.params.dishid} HAD BEEN DELETED`);
})


module.exports = dishRouter;