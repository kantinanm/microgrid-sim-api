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
    /*var opt = {
      'username': req.body.txtUsr,
      'password': req.body.txtPwd,
    }
      res.json(opt);
    }*/

    var result = {
        'success':1,
        'input01': req.body.input01,
        'input02': req.body.input02,
        'input03': req.body.input03,
        'input04': req.body.input04,
        'input05': req.body.input05,
        'input06': req.body.input06,
        'input07': req.body.input07,
        'input08': req.body.input08,
    }

    util.createCSVInput(result, function (data) {
        console.log("create file completed.");  
        console.log(data);  
    });

    util.executeDigSILENT(result, function (data) {
        console.log("execute completed.");  
        console.log(data.toString());  
    });

    //console.log(result);      // your JSON
    res.send(result);    // echo the result back
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });