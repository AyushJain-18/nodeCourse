const errorFunction = (request, response, next) => {
    const err = new Error('You are not authenticated');
    response.setHeader('WWW-Authenticate', 'Basic');
    err.status = 403;
    //response.status = 401
    next(err);
}

const auth = (req, res, next) => {
    console.log(req.user);

    if (!req.user) {
        errorFunction(req, res, next)
    }
    else {
        next();
    }
}

module.exports = auth;