var jsforce = require('jsforce');
var conn = new jsforce.Connection();

var User = function (usr,pwd, protect_token) {
    this.usr = usr;
    this.pwd = pwd+protect_token;

};
var user = new User('nicholaslopiccolo@wanted.com', 'stage2018', 'oIQIILzzEfVUq7DrjRFQxBGR');

var conSF = function(usr, pwd) {
    conn.login(usr, pwd, function (err, res) {
        if (err) {return console.error(err);}
        else console.log('Connessione avvenuta al db di Salesforce')
    });
};
var querySF = function (query) {
    //SELECT Id, Name FROM Account
    conn.query(query, function (err, res) {
        console.log('...eseguo la query...');
        if (err) {
            console.error(err);
        }
        else return res.records;

    });
};
var accountSF = function () {
        var arrayId = [];
        var arrayName = [];

    conn.query('SELECT Id, Name FROM Account', function (err, res) {
        console.log('...eseguo la query...');

        if (err) {
            console.error(err);
        }
        else {
            for (var i in res.records) {
                name = res.records[i].Name;
                id = res.records[i].Id;
                console.log(name + '        ' + id);
                arrayId[i] = id;
                arrayName[i] = name;
            }
        }
    });
    var records = {
        id: arrayId,
        name: arrayName
    };
    return records ;
};
var fillTableSF = function(array,tbname) {
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
//esporto le variabili
exports.user = user;

//esporto le funzioni
exports.conSF = conSF;
exports.querySF = querySF;
exports.accountSF = accountSF;