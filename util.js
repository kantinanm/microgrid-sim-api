var fs = require("fs");
var endOfLine = require('os').EOL;
var  {PythonShell} = require('python-shell');
const _ = require('lodash');

var config = require('./config');


exports.createCSVInput = function (opt, cb) {
    var  stream;
    stream = fs.createWriteStream(config.pythonApp.pathInput+'//'+config.pythonApp.fileNameInput);    
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
    
    const data = [];

    (async () => {
        const readStream = fs.createReadStream(config.pythonApp.pathInput+'//'+config.pythonApp.fileNameInput);
        
        readStream.on('data', (chunk) => {
            console.log(Buffer.from(chunk).toString());
            data.push(Buffer.from(chunk).toString());
        });

        await readStream.on('end', function () {
            console.log("read finish.");
            cb(data.toString().split(/\r?\n/));
        });

    })();

  };

  exports.executeDigSILENT = function (opt, cb) {
    console.log("let execute.");
    
    let target =config.pythonApp.path+'//'+config.pythonApp.mainFileAppPy;
    var pyshell ;
    
    if(config.mode=='production'){
        pyshell = new PythonShell(target,null);
    }else{
        pyshell = new PythonShell('python/test.py',null);
    }
     
    
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log('on msg :'+message);
    });

    (async () => {
        await pyshell.end(function (err) {
            if (err){throw err;};
                console.log('execute finished');
                cb( {'ack':'1'});
            });
    })();
 
    /*(async () => {
        await pyshell.PythonShell.run("python/test.py",null, function (err, data) {
            if (err) throw err;
             cb( data);
        });
    })();*/
 };


exports.readOutput = function (cb) {
    console.log("let reader.");
    const  output = [];
    const  outputModify = [];
    (async () => {

        let targetFile;
        let readStr;
        
        if(config.mode=='production'){
            targetFile =config.pythonApp.pathOutput+'//'+config.pythonApp.fileNameOutput;
        }else{
            targetFile = config.pythonApp.pathInput+'//'+config.pythonApp.fileNameInput;
        }
          console.log("start reader "+targetFile);
          readStr = fs.createReadStream(targetFile);

          if (fs.existsSync(targetFile)) {
            //file exists
            console.log("file exists.");
          }else{
            console.log("file not exists.");
          }
            readStr.on('data', (chunk) => {
                console.log(Buffer.from(chunk).toString());
                output.push(Buffer.from(chunk).toString());
            });
        await readStr.on('end', function () {
                console.log("read output finish.");
                _.map(output.toString().split(/\r?\n/), (val, key) => {
                    outputModify.push(val);
                 });
                cb(outputModify);
            });
    })();
}

