var mysql = require('mysql');

var param = {
    host: "mysql56.gnet.it",
    user: "stage",
    password: "stage2018",
    database: "stage2018"
};

var con = null;

// CONNESISONE DB TRAMITE JS
var conDB = function() {
    con = mysql.createConnection(param);
    con.connect(function (err) {
        if (err) console.log(err);
        else console.log('Connessione avvenuta al db ' + param.database);
    });
};

// QUERY VARIE
var queryDB = function(query) {
    con.query(query, function (err, result, fields) {
        if (err) console.log(err);
        else console.log(query + ': query avvernuta con successo!!!')
    });
};
var readDB = function(tbname,param) {

    return con.query('SELECT '+ getCollumn(param) +' FROM stage2018.' + tbname, function (err, result, fields) {

        if (err) console.log(err);
        else {
            console.log('Lettura avvernuta con successo\n');
        }
    })._results;

};
var createTableDB = function(tbName) {
    console.log('Creo la tabella '+ tbName + '...');
    var sql = "CREATE TABLE " + tbName + " (Id INT PRIMARY KEY AUTO_INCREMENT, IdSf VARCHAR(20) NOT NULL, Name VARCHAR(30) NOT NULL)";
    con.query(sql, function (err, result, fields) {
        if (err) console.log(err);
        else console.log('                              ...tabella creata\n');
    });
};
var dropTableDB = function(tbName) {
    con.query("DROP TABLE "+ tbName, function (err, result, fields) {
        if (err) console.log(err);
    });
};
var fillTableDB = function(array,tbname) {
    console.log('Riempio la tabella '+ tbname + '...\n');
    for (var i=0 in array.id) {

        con.query('INSERT INTO ' + tbname + '(Id, IdSf, Name) VALUES ("","' + array.id[i] + '","' + array.name[i] + '")', function (err, result) {
            if (err) console.log(err);
            else console.log('Row Inserita');
        });
        i++;
    }
};
var updateRecordDB = function() {

};

var getCollumn = function(string){
    var array = string.split('|');
    var newString = '';
    for (var i=0; i < array.length; i++) {
        if(i != (array.length-1)) newString = newString + array[i]+ ',';
        else newString = newString + array[i];
    }
    console.log('start: '+newString);
    return newString;
};

// FINE QUERY

exports.conDB = conDB;

exports.queryDB = queryDB;
exports.createTableDB = createTableDB;
exports.readDB = readDB;
exports.dropTableDB = dropTableDB;
exports.fillTableDB = fillTableDB;
exports.updateRecordDB = updateRecordDB;