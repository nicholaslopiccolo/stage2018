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
        var fields = sf.accountSF();//scarica la tabella
        setTimeoutPromise(500).then(function () {
            db.createTableDB(tbname);//crea la tabella
            setTimeoutPromise(500).then(function () {
                db.fillTableDB(fields, tbname);//riempie la tabella
            });
        });
    });
};
function inseriscidaDB (tbname,param){
    setTimeoutPromise(1500).then(function () {
        var fields = db.readDB(tbname, param);//scarica la tabella
        setTimeoutPromise(500).then(function () {
            sf.fillTableSF(fields[0], 'Account');//riempie la tabella
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
