### Features
UI and API service to create csv input and activate DigSILENT to execute in whole project script that created by Python language.  
# How to install
Use powershell or cmd and type by order, please see below.
- `git clone https://github.com/kantinanm/microgrid-sim-api.git`
- `cd microgrid-sim-api`
- > install package dependency in this project.
    `npm install`
- > create config.js and modify value.
  `cp config.js.default config.js` 
  > In windows use command `copy config.js.default config.js` 
  > at config.js file to modify value, 
  ```javascript
   exports.mode = 'production'; // for test use exports.mode = 'debug' 
   exports.pythonApp = {
    "path": "C://Program Files//DIgSILENT//PowerFactory 15.2//Python//3.3", // path to keep python project, eg. C://Program Files//DIgSILENT/xxxx
    "mainFileAppPy": "",// python file to execute project, eg. xxx.py
    "fileNameInput": "", // input file to use for python script in project, eg. xxx.csv
    "fileNameOutput": "", // output file to use for python script in project,  eg. xxx.csv
    "pathInput":"", //Destination path to store csv input, eg. D://Microgrid
    "pathOutput":"", //Destination path to store csv output, eg. D://Microgrid
  }
- `npm run start`


# Test URL
http://localhost:3000
