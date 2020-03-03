
const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');
 
const promotionRouter = express.Router();  // to make dishRouter a router;
promotionRouter.use(bodyParser.json()); // TO USE ANY MIDDELWARE WE WILL USE();

promotionRouter.route('/')
// .all((req, res, next)=>{
//         res.statusCode = 200;
//         res.setHeader('content-type','text/html');
//         next();
// })
.get((req,res, next)=>{
    Promotions.find({}).then(allPromotions =>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        res.json(allPromotions)
    },err => next(err)).catch(err => next(err))
})
.post((req,res, next)=>{
    Promotions.create(req.body).then(response =>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        res.json(response);
    },err => next(err)).catch(err => next(err));
})
.put((req,res, next)=>{
    res.end('CANNOT MODIFIED ALL PROMOTIONs on /promotion')
})
.delete((req,res, next)=>{
    Promotions.remove({}).then(response =>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        res.json(response);
    },err => next(err)).catch(err => next(err))
})


promotionRouter.route('/:promoId ')
.get( function (req,res, next){
    Promotions.findById(req.params.promoId).then(promotion =>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        res.json(promotion);
    },err => next(err)).catch(err => next(err))
})
.post((req,res, next)=>{
    res.end(`POST OPERATION IS NOT SUPPORTED`)
})
.put((req, res, next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{$set: {'description':'updated description'}}
    ,{new: true}).then(promotion=>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        res.json(promotion);
    },err=>next(err)).catch(err => next(err));
})
.delete((req,res, next)=>{ 
    Promotions.findByIdAndRemove(req.params.promoId).then(response=>{
        res.statusCode = 200;
        res.setHeader('content-type','text/html');
        res.json(response);
    },err=>next(err)).catch(err => next(err));
})


module.exports = promotionRouter;