var util = require ('util');
const setTimeoutPromise = util.promisify(setImmediate);

var sf = require('./SFLibrary.js');
var db = require('./DBLibrary.js');


function connessione (){
    sf.conSF(sf.user.usr,sf.user.pwd); //eseguo la connessione
    db.conDB();
}

function scaricaTB(param,tbname) {
    setTimeoutPromise(1500).then(function () {
        db.createTableDB(tbname);//crea la tabella
        var rows = sf.readSF(param,tbname);//scarica la tabella
            setTimeoutPromise(500).then(function () {
                console.log(rows);
                db.fillTableDB(rows, tbname);//riempie la tabella
            });
        });
};
function errPromise(reason) {
    console.log('Handle rejected promise ('+reason+') here.');
};
function inseriscidaDB (tbname,param){
    setTimeoutPromise(1500).then(function () {
        var fields = db.readDB(tbname, param);//scarica la tabella
        setTimeoutPromise(500).then(function () {
            sf.fillTableSF(fields[0], 'Account');//riempie la tabella
        });
    });
};



//la funzione syncronize è di prova **da modificare
function synchronizes(tbname){
    console.log('Sincronizzazione...\n');
    var newRows = sf.readSF('Id|LastModifiedData',tbaname); //prende tutte le row (param: Id, LastModifiedData)
    checkRows(newRows);
    sf.getUpdatedRows(upRows);
};
function checkRows(rows){
    var modifiedID = [];
    var nRow = -1;
    for (var i in rows, i++) {
        if(rows.LastModifiedDate[i] <= Date.now())
        {
            nRow++;
            modifiedID[nRow] = rows.Id[i];
        }
    }

};

exports.connessione = connessione;
exports.scaricaTB = scaricaTB;
exports.inseriscidaDB = inseriscidaDB;
exports.synchronizes = synchronizes;
