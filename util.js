var fs = require("fs");
var endOfLine = require('os').EOL;
const getStream = require('get-stream');
var pyshell =  require('python-shell');
var config = require('./config');


exports.createCSVInput = function (opt, cb) {
    var  stream;
    stream = fs.createWriteStream("D://"+config.pythonApp.fileNameInput);    
    stream.write(opt.input01);
    stream.write(endOfLine);
    stream.write(opt.input02);
    stream.write(endOfLine);
    stream.write(opt.input03);
    stream.write(endOfLine);
    stream.write(opt.input04);
    stream.write(endOfLine);
    stream.write(opt.input05);
    stream.write(endOfLine);
    stream.write(opt.input06);
    stream.write(endOfLine);
    stream.write(opt.input07);
    stream.write(endOfLine);
    stream.write(opt.input08);
    
    const readStream = fs.createReadStream('D://'+config.pythonApp.fileNameInput);
    let data = [];

    (async () => {
        const readStream = fs.createReadStream('D://'+config.pythonApp.fileNameInput);
        
        readStream.on('data', (chunk) => {
            console.log(Buffer.from(chunk).toString());
            data.push(Buffer.from(chunk).toString());
        });

        await readStream.on('end', function () {
            console.log("read finish.");
            cb(data);
        });

    })();

  };

  exports.executeDigSILENT = function (opt, cb) {
    console.log("let execute.");
    (async () => {
        await pyshell.PythonShell.run("python/test.py",null, function (err, data) {
             cb( data);
        });
    })();
 };