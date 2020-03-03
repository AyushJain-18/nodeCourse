const express = require('express');
const bodyParser = require('body-parser');

 
const leaderRouter = express.Router();  // to make dishRouter a router;
leaderRouter.use(bodyParser.json()); // TO USE ANY MIDDELWARE WE WILL USE();

leaderRouter.route('/')
.all((req, res, next)=>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        next();
})
.get((req,res, next)=>{
    res.end('DISPLAYING ALL LEADERS TO YOU')
})
.post((req,res, next)=>{
    res.end(`ADDING YOUR LEADRE with name ${req.body.name}`)
})
.put((req,res, next)=>{
    res.end('CANNOT MODIFIED ALL LEADERS')
})
.delete((req,res, next)=>{
    res.end('ALL LEADRES HAD BEEN DELETED');
})

leaderRouter.route('/:leadreID')
.get( function (req,res, next){
    res.end('DISPLAYING LEADRES with leaderID'+ req.params.leadreID)
})
.post((req,res, next)=>{
    res.end(`POST OPERATION IS NOT SUPPORTED`)
})
.put((req,res, next)=>{
    res.end('LEADER WITH LEADER id :-'+req.params.leadreID +'HAD BEEN MODIFIED ')
})
.delete((req,res, next)=>{
    res.end(`LEADER WITH LEADER id :- ${req.params.leadreID} HAD BEEN DELETED`);
})


module.exports = leaderRouter;