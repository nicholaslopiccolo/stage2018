var fs = require('fs');
var util = require('util');
var https = require('https');
var async = require('async');
var express = require('express');
const setTimoutPromise = util.promisify(setTimeout);
var app = new express();

var sf = require('./SFLibrary.js');
var db = require('./DBLibrary.js');
var funcs = require('./mainFunc.js');


//avvio il server https
const serverOptions = {
    key: fs.readFileSync('cert/key.pem', 'utf8'),
    cert: fs.readFileSync('cert/server.crt', 'utf8')
};
https.createServer(serverOptions, app).listen(3000,function(){
    console.log('Node   HTTPS server is running...');
    main();
});

function main(){
    funcs.connessione();
    setTimoutPromise(2000).then(function(){
    funcs.scaricaTB('Id|Name', 'Account');
    });
}



