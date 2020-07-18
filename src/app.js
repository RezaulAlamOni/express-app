var express = require('express')
var app = express()
const path = require('path');


https = require('http'),//for http server
    // server = https.createServer(app),
    port = 5000,
    ipAddress = '0.0.0.0';
// server.listen(port,ipAddress,function () {
//     console.log('Server started on port : ' + port);
// });
//simple server
app.listen(port, () => {
    console.log('Server started on port : ' + port);
})
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'public'))) // set static folder

const logger = require('../middleware/logger');
// app.use(logger) // init middleware logger


//import api route for members
app.use('/api/members',require('../routes/api/member'));



app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    res.send('hello secret world')
})
//with prams
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})