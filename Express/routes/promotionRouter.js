
const express = require('express');
const bodyParser = require('body-parser');

 
const promotionRouter = express.Router();  // to make dishRouter a router;
promotionRouter.use(bodyParser.json()); // TO USE ANY MIDDELWARE WE WILL USE();

promotionRouter.route('/')
.all((req, res, next)=>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        next();
})
.get((req,res, next)=>{
    res.end('DISPLAYING ALL PROMOTIONS TO YOU')
})
.post((req,res, next)=>{
    res.end(`ADDING YOUR PROMOTION with name ${req.body.name}`)
})
.put((req,res, next)=>{
    res.end('CANNOT MODIFIED ALL PROMOTIONs')
})
.delete((req,res, next)=>{
    res.end('ALL PROMOTIONs HAD BEEN DELETED');
})


promotionRouter.route('/:promitionid')
.get( function (req,res, next){
    res.end('DISPLAYING PROMOTION with PROMOTIONID'+ req.params.promitionid)
})
.post((req,res, next)=>{
    res.end(`POST OPERATION IS NOT SUPPORTED`)
})
.put((req,res, next)=>{
    res.end('PROMOTION WITH PROMOTION id :-'+req.params.promitionid +'HAD BEEN MODIFIED ')
})
.delete((req,res, next)=>{
    res.end(`PROMOTION WITH PROMOTION_ID:- ${req.params.promitionid} HAD BEEN DELETED`);
})


module.exports = promotionRouter;