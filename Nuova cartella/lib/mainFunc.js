var async = require('async');

var sf = require('./SFLibrary.js');
var db = require('./DBLibrary.js');

var scaricaTB = function (tbname,callback) {
    async.waterfall([
        function (callback) {
        console.log('ECCO IL TBNAME: '+ tbname);
            callback(null, tbname);
        },
        db.createTableDB,
        sf.readSF,
        db.fillTableDB
    ]);
};
var inseriscidaDB = function (tbname, param) {
    setTimeoutPromise(1500).then(function () {
        var fields = db.readDB(tbname, param);//scarica la tabella
        setTimeoutPromise(500).then(function () {
            sf.fillTableSF(fields[0], 'Account');//riempie la tabella
        });
    });
};

var synchronizes = function (tbname) {
    console.log('Sincronizzazione...\n');
    var newRows = sf.readSF('Id|LastModifiedData', tbaname); //prende tutte le row (param: Id, LastModifiedData)
    checkRows(newRows);
    sf.getUpdatedRows(upRows);
};
var checkRows = function (rows) {
    var modifiedID = [];
    var nRow = -1;
    for (var i in rows, i++) {
        if (rows.LastModifiedDate[i] <= Date.now()) {
            nRow++;
            modifiedID[nRow] = rows.Id[i];
        }
    }

};

exports.scaricaTB = scaricaTB;
exports.inseriscidaDB = inseriscidaDB;
exports.synchronizes = synchronizes;
