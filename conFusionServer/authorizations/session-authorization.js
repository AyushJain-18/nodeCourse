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
        const authorizationHeaders = request.headers.authorization
        if (!authorizationHeaders) {
            console.log('Error function is called');
            errorFunction(request, response, next);
        }
        const auth = new Buffer.from(authorizationHeaders.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        console.log(`UserName is ${user} and password is ${pass}`);
        if (user === 'admin' && pass === 'password') {
            request.session.user = 'admin';
            next()
        } else {
            errorFunction(request, response, next);
        }
    } else {
        if(request.session.user === 'admin'){
            next();    
        }else{
            errorFunction(request, response, next);
        }
     }
}

module.exports = auth;