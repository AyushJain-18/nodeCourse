
const express = require('express');
const bodyParser = require('body-parser');


const dishRouter = express.Router();  // to make dishRouter a router;
dishRouter.use(bodyParser.json()); // TO USE ANY MIDDELWARE WE WILL USE();

const Dishes = require('../models/dishesh')

dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({}).then(dishes => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes) // this will setup response 
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    })
    .post((req, res, next) => {
        Dishes.create(req.body).then(dish => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish) // this will setup response 
        }, (err) => next(err)).catch((err) => next(err));
        //res.end(`ADDING YOUR DISH with name ${req.body.name} and discription is ${req.body.description}`)
    })
    .put((req, res, next) => {
        res.end('CANNOT MODIFIED ALL DISHES this opertaion not supported in /dishes')
    })
    .delete((req, res, next) => {
        //res.end('ALL DISHESH HAD BEEN DELETED');
        Dishes.remove({}).then(response => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response) // this will setup response 
        }, (err) => next(err)).catch((err) => next(err));
    })



dishRouter.route('/:dishid')
    .get(function (req, res, next) {
        // res.end('DISPLAYING DISH with dishID'+ req.params.dishid)
        Dishes.findById(req.params.dishid).then(dish => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish) // this will setup response 
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    })
    .post((req, res, next) => {
        res.end(`POST OPERATION IS NOT SUPPORTED`)
    })
    .put((req, res, next) => {
        //res.end('DISH WITH dish id :-' + req.params.dishid + 'HAD BEEN MODIFIED ')
        Dishes.findByIdAndUpdate(req.params.dishid, { $set: req.body }, { new: true }).then(dishes => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes) // this will setup response 
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    })
    .delete((req, res, next) => {
        //res.end(`DISH WITH dishID:- ${req.params.dishid} HAD BEEN DELETED`);
        Dishes.findByIdAndRemove(req.params.dishid).then(dishes => {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes) // this will setup response 
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    })



dishRouter.route('/:dishid/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishid).then(dish => {
            if (dish !== null) {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments) // this will setup response 
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.dishid).then(dish => {
            if (dish !== null) {
                dish.comments.push(req.body);
                dish.save().then(response => {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments) // this will setup response
                }, err => next(err))
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
            //res.end(`ADDING YOUR DISH with name ${req.body.name} and discription is ${req.body.description}`)
        })
    })
    .put((req, res, next) => {
        res.end('CANNOT MODIFIED ALL DISHES this opertaion not supported in /dishes/' + req.params.dishid + '/comments')
    })
    .delete((req, res, next) => {
        //res.end('ALL DISHESH HAD BEEN DELETED');
        Dishes.findById(req.params.dishid).then(dish => {
            if (dish !== null) {
                for (let i = dish.comments.length - 1; i >= 0; i--) {
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                // dish.comments.forEach(comment => {
                //     console.log(comment);
                //     dish.comments.id(comment._id).remove();
                // });
                dish.save().then(response => {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments) // this will setup response
                }, err => next(err))
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        })
    })



dishRouter.route('/:dishid/comments/:commentid')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishid).then(dish => {
            if (dish !== null && dish.comments.id(req.params.commentid)!==null) {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentid)) // this will setup response 
            } else {
                if(dish.comments.id(req.params.commentid)===null){
                    err = new Error('Comment with comment id' + req.params.commentid + ' not found');
                    err.status = 404;
                    return next(err);
                }else{
                    err = new Error('Dish with dish id  ' + req.params.dishid + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    })
    .post((req, res, next) => {
        res.end(`POST OPERATION IS NOT SUPPORTED`)
    })
    .put((req, res, next) => {
        Dishes.findById(req.params.dishid).then(dish => {
            if (dish !== null && dish.comments.id(req.params.commentid)!==null) {
                req.body.rating? dish.comments.id(req.params.commentid).rating = req.body.rating:'';
                req.body.comment?dish.comments.id(req.params.commentid).comment = req.body.comment:'';
                dish.save().then(response => {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentid)) // this will setup response 
                }, (err) => next(err))
            } else {
                if(dish.comments.id(req.params.commentid)===null){
                    err = new Error('Comment with comment id' + req.params.commentid + ' not found');
                    err.status = 404;
                    return next(err);
                }else{
                    err = new Error('Dish with dish id  ' + req.params.dishid + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    
       
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishid).then(dish => {
            if (dish !== null && dish.comments.id(req.params.commentid)!==null) {
                dish.comments.id(req.params.commentid).remove();
                dish.save().then(response => {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments) // this will setup response 
                }, (err) => next(err))
            } else {
                if(dish.comments.id(req.params.commentid)===null){
                    err = new Error('Comment with comment id' + req.params.commentid + ' not found');
                    err.status = 404;
                    return next(err);
                }else{
                    err = new Error('Dish with dish id  ' + req.params.dishid + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }
        }, (err) => next(err))
            .catch(error => console.log('OPPS!!!! ERROR OCCURED \n', error))
    
    })


module.exports = dishRouter;