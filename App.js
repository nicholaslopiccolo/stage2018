var fs = require('fs');
var https = require('https');
var express = require('express');
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
});

//connessione
funcs.connessione();
//elaborazione
funcs.scaricaTB('Account');

function inseriscidaDB (id,name){
    var fieldsDB = null;
    var fieldsSF = null;
    setTimeoutPromise(1500).then(function () {
        fieldsSF = sf.accountSF();
        setTimeoutPromise(500).then(function () {
            db.createTable(tbname);
            setTimeoutPromise(500).then(function () {
                db.fillTable(fieldsDB, tbname);
            });
        });
    });

};