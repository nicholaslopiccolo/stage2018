var jsforce = require('jsforce');
var conn = new jsforce.Connection();

var User = function (usr,pwd, protect_token) {
    this.usr = usr;
    this.pwd = pwd + protect_token;

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
var readSF = function (param,tbname) {
        var arrayId = [];
        var arrayName = [];

    conn.query('SELECT '+ getCollumn(param)+' FROM ' + tbname, function (err, res) {
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

    conn.sobject(tbname).create(array, function(err, rets) {

            if (err) { return console.error(err); }
            for (var i=0; i < rets.length; i++) {
                if (rets[i].success) {
                    console.log("Created record id : " + rets[i].id);
                }
                else console.log('errore...')
            }
        });

};

var getCollumn = function(string){
    var array = string.split('|');
    var newString = '';
    for (var i=0; i < array.length; i++) {
        if(i != array.length) newString = newString + array[i]+ ',';
        else newString = newString + array[i];
    }
    console.log('start: '+newString);
    return newString;
};
//esporto le variabili
exports.user = user;

//esporto le funzioni
exports.conSF = conSF;
exports.querySF = querySF;
exports.accountSF = readSF;
exports.fillTableSF = fillTableSF;

exports.getCollum = getCollumn;