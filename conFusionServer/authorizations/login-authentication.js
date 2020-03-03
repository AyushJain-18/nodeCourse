const errorFunction = (request, response, next) => {
    const err = new Error('You are not authenticated');
    response.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    //response.status = 401
    next(err);
}


const auth = (request, response, next) => {
    console.log('REQUEST HEADERS ARE \n', request.headers);
    if (!request.session.user) {
        errorFunction(request, response, next);
    } else {
        if(request.session.user === 'authenticated'){
            next();    
        }else{
            errorFunction(request, response, next);
        }
     }
}

module.exports = auth;