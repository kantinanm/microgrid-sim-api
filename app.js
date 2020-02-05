const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var util = require('./util');


const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var htmlToJson = require('html-to-json');


var io = socketIO(server);

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', function(req, res) {
    res.sendFile('public/index.htm', { root: __dirname });
});

app.post('/calculate', function (req, res) {
    /*
      res.json(opt);
    }*/
    var opt = {
        'input01': req.body.input01,
        'input02': req.body.input02,
        'input03': req.body.input03,
        'input04': req.body.input04,
        'input05': req.body.input05,
        'input06': req.body.input06,
        'input07': req.body.input07,
        'input08': req.body.input08,
    }

    util.createCSVInput(opt, function (data) {
        console.log("create file completed.");  
        console.log(data);  
    });

    var  result = {
        'success':1
    }
    util.executeDigSILENT(opt, function (data) {

        console.log("execute completed.");  
        console.log(data);  
    });

    res.send(result); 
});

io.on('connection', (socket) => {
    console.log('New client connected.');

    socket.on('process', (data_opt, callback) => {
        console.log('process', data_opt);
        var  result ;

        util.createCSVInput(data_opt, function (data) {
            console.log("create file completed.");  
            console.log(data);  
        });
    
        util.executeDigSILENT(data_opt, function (data) {
            console.log("execute completed.");  
            console.log(data);  
            result = {
                'success':1,
                'data':data
            }

            util.readOutput( function (stream_output) {
                result = {
                    'success':1,
                    'data':stream_output
                }
                callback(result);
            });

        });

      });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });