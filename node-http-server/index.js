const http = require('http');
const path = require('path');
const fileSystem = require('fs');


const hostname = 'localhost';
const port = 3000;

let fileName;
let filePath;
let fileExt;
const server = http.createServer((request, response) => {
    console.log(`URL visited by user is ${request.url} And method is ${request.method}`);
    response.setHeader('content-Type','text/html')
    if (request.method === 'GET') {
        fileName = request.url;
        if (request.url === '/') {
            fileName = 'index.html'
        }
        filePath = path.resolve(`./public/${fileName}`);
        fileExt = path.extname(`./public/${fileName}`)
        if(fileExt === '.html'){
        fileSystem.exists(filePath, (isExists) => {
            if (!isExists) {
                response.statusCode = 404
                response.end(`<html><body><h1> ERROR 404 !! ${fileName} not found </h1></body></html>`);
                return
            } else {
                response.statusCode = 200;
                fileSystem.createReadStream(filePath).pipe(response)
            }
        })
    }else{
        response.end(`<html><body><h1> ERROR: !! ${fileName} is not a html file </h1></body></html>`);
    }
    } else {
        response.end(`<html><body><h1> ERROR: !! ${request.method} not Supported </h1></body></html>`);
    }
})

server.listen(port, hostname, () => {
    console.log(`SERVER IS UP AND RUNNING ON http://${hostname}:${port}`)
})
