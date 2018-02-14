var jsforce = require('jsforce');
var conn = new jsforce.Connection();
var User = function (usr, pwd, protect_token) {
    this.usr = usr;
    this.pwd = pwd + protect_token;

};
var user = new User('nicholaslopiccolo@wanted.com', 'stage2018', 'oIQIILzzEfVUq7DrjRFQxBGR');

var conSF = function (callback) {
    console.log('conSF started');
    conn.login(user.usr, user.pwd, function (err, res) {
        if (err) {
            console.log('Errore SQL:   ' + err.code);
            conSF(callback);
        }
        else {
            console.log('Connessione avvenuta al db di Salesforce\n');
            if (callback != undefined) callback(null);
        }
    });
};
var querySF = function (query, callback) {
    //SELECT Id, Name FROM Account
    conn.query(query, function (err, res) {
        console.log('...eseguo la query...');
        if (err) {
            console.error(err);
        }
        else return res.records;

    });
};
var readSF = function (tbname, callback) {
    var records = null;

    //condizione 12 ore dall'ultima modifica
    var sql = 'SELECT ' + getColumn() + ' FROM ' + tbname /*+ ' WHERE LastModifiedDate > ' + newDate(43200000)*/;
    console.log('Inizio la lettura...');
    conn.query(sql, function (err, res) {
        if (err) {
            console.log('Errore SQL:   ' + err.code);
            if (callback !== undefined) callback(null, tbname);
        }
        else {
            console.log('...fine lettura');
            records = res;
            if (callback !== undefined) callback(null, records, tbname);
        }

    });
};
var fillTableSF = function (array, tbname, callback) {

    conn.sobject(tbname).create(array, function (err, rets) {
        if (err) console.log('Errore SQL:   ' + err.code);
        for (var i = 0; i < rets.length; i++) {
            if (rets[i].success) {
                console.log("Created record id : " + rets[i].id);
            }
            else console.log('errore...')
        }
    });

};


var getColumn = function () {
    var string = 'Id"AccountNumber"AccountSource"Active__c"AnnualRevenue"BillingCity"BillingCountry"BillingGeocodeAccuracy"BillingLatitude"BillingLongitude"BillingPostalCode"BillingState"BillingStreet"CleanStatus"CreatedDate"CustomerPriority__c"Description"DunsNumber"Fax"Industry"IsDeleted"Jigsaw"JigsawCompanyId"LastActivityDate"LastModifiedDate"LastReferencedDate"LastViewedDate"NaicsCode"NaicsDesc"Name"NumberOfEmployees"NumberofLocations__c"Ownership"Phone"PhotoUrl"Rating"SLAExpirationDate__c"SLASerialNumber__c"SLA__c"ShippingCity"ShippingCountry"ShippingGeocodeAccuracy"ShippingLatitude"ShippingLongitude"ShippingPostalCode"ShippingState"ShippingStreet"Sic"SicDesc"Site"SystemModstamp"TickerSymbol"Tradestyle"Type"UpsellOpportunity__c"Website"YearStarted';
    var array = string.split('"');
    var newString = '';
    for (var i = 0; i < array.length; i++) {
        if (i !== (array.length - 1)) newString = newString + array[i] + ',';
        else newString = newString + array[i];
    }
    console.log('start: ' + newString);
    return newString;
};
var createColumn = function (string) {
    var array = string.split('"');
    var newString = '';
    for (var i = 0; i < array.length; i++) {
        if (i !== (array.length - 1)) newString = newString + array[i] + ' VARCHAR(30) ' + ',';
        else newString = newString + array[i] + ' VARCHAR(30) ';
    }
    console.log('start: ' + newString);
    return newString;
};
var newDate = function (value) {
    var date = (new Date().valueOf());
    date = date - value;
    date = new Date(date).toISOString().toString();
    date = date.split('.');
    date = date[0] + '.000+0000';
    return date;
};

//esporto le variabili
exports.user = user;

//esporto le funzioni
exports.conSF = conSF;
exports.querySF = querySF;
exports.readSF = readSF;
exports.fillTableSF = fillTableSF;

//exports.getCollum = getColumn;