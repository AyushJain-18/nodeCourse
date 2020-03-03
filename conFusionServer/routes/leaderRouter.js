const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter = express.Router();  // to make dishRouter a router;
leaderRouter.use(bodyParser.json()); // TO USE ANY MIDDELWARE WE WILL USE();

const leaders = require('../models/leader')

leaderRouter.route('/')
    // .all((req, res, next)=>{
    //         res.statusCode = 200;
    //         res.setHeader('content-type','text/html');
    //         next();
    // })
    .get((req, res, next) => {
        leaders.find({}).then(allleaders => {
            res.statusCode = 200;
            res.setHeader('content-type', 'text/html');
            res.json(allleaders)
        }, err => next(err)).catch(err => next(err))
    })
    .post((req, res, next) => {
        leaders.create(req.body).then(leader => {
            res.statusCode = 200;
            res.setHeader('content-type', 'text/html');
            res.json(leader)
        }, err => next(err)).catch(err => next(err))
    })
    .put((req, res, next) => {
        res.end('CANNOT MODIFIED ALL LEADERS')
    })
    .delete((req, res, next) => {
        leaders.remove({}).then(leader => {
            res.statusCode = 200;
            res.setHeader('content-type', 'text/html');
            res.json(leader)
        }, err => next(err)).catch(err => next(err))
    })

leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        leaders.findById(req.params.leaderId).then(leader => {
            res.statusCode = 200;
            res.setHeader('content-type', 'text/html');
            res.json(leader)
        }, err => next(err)).catch(err => next(err))
    })
    .post((req, res, next) => {
        res.end(`POST OPERATION IS NOT SUPPORTED for leader/`, req.params.leaderId)
    })
    .put((req, res, next) => {
        leaders.findByIdAndUpdate(req.params.leaderId, { $set: { 'description': 'Bagh sher aya sher' } }
            , { new: true }).then(leader => {
                res.statusCode = 200;
                res.setHeader('content-type', 'text/html');
                res.json(leader)
            }, err => next(err)).catch(err => next(err))
    })
    .delete((req, res, next) => {
      leaders.findByIdAndRemove(req.params.leaderId).then(response => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');
        res.json(response)
    }, err => next(err)).catch(err => next(err))
})


module.exports = leaderRouter;