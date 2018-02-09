var util = require ('util');
const setTimeoutPromise = util.promisify(setTimeout);

var sf = require('./SFLibrary.js');
var db = require('./DBLibrary.js');


function connessione (){
    sf.conSF(sf.user.usr,sf.user.pwd); //eseguo la connessione
    db.conDB();
}
function scaricaTB(tbname) {
    setTimeoutPromise(1500).then(function () {
        var fields = sf.accountSF();
        setTimeoutPromise(500).then(function () {
            db.createTableDB(tbname);
            setTimeoutPromise(500).then(function () {
                db.fillTableDB(fields, tbname);
            });
        });
    });
};
function inseriscidaDB (tbname,param){
    var fieldsDB = null;
    var fieldsSF = null;
    setTimeoutPromise(1500).then(function () {
        fieldsDB = db.readDB(tbname, param);
        setTimeoutPromise(1000).then(function () {
            console.log(fieldsDB);
        });
    });
};

function synchronizes(){
    console.log('Sincronizzazione...\n')
};

exports.connessione = connessione;
exports.scaricaTB = scaricaTB;
exports.inseriscidaDB = inseriscidaDB;
exports.synchronizes = synchronizes;
