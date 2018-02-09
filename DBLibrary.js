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
var createTableDB = function(tbName) {
    console.log('Creo la tabella '+ tbName + '...\n');

    con.query("CREATE TABLE " + tbName + " (Id VARCHAR(30) PRIMARY KEY, Name VARCHAR(30) NOT NULL)", function (err, result, fields) {
        if (err) console.log(err);
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

        var sql = 'INSERT INTO ' + tbname + '(Id, Name) VALUES ("' + array.id[i] + '","' + array.name[i] + '")';
        console.log(sql);

        con.query(sql, function (err, result, fields) {
            if (err) console.log(err);
        });
        i++;
    }

};
var updateRecordDB = function() {

};
// FINE QUERY

exports.conDB = conDB;

exports.queryDB = queryDB;
exports.createTableDB = createTableDB;
exports.dropTableDB = dropTableDB;
exports.fillTableDB = fillTableDB;
exports.updateRecordDB = updateRecordDB;