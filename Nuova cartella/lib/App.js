var async = require('async');

var sf = require('./SFLibrary.js');
var db = require('./DBLibrary.js');
var funcs = require('./mainFunc.js');

var connect = function () {
    async.waterfall([
        sf.conSF,
        db.conDB,
        //funcs.scaricaTB
    ]);
};
exports.connect=connect;
