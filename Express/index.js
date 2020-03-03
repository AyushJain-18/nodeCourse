const express = require('express');
const http = require('http');
const logger = require('morgan');

const hostName = 'localhost';
const port = 3000;

const app = express();
const dishRouter = require('./routes/dishRouter');
 const leaderRouter = require('./routes/leaderRouter')
const promotionRouter = require('./routes/promotionRouter')

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'))

app.use('/dishes', dishRouter);
app.use('/leader', leaderRouter);
app.use('/promotion', promotionRouter);

const server = http.createServer(app);
server.listen(port, hostName, () => {
    console.log(` server is up and running on http://${hostName}:${port}`)
})