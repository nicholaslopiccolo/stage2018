var mysql = require('mysql');
var async = require('async');

var paramDB = {
    host: "",
    user: "",
    password: "",
    database: ""
};
var con = null;

var conDB = function (callback) {
    con = mysql.createConnection(paramDB);
    con.connect(function (err) {
        console.log('conDB started');
        if (err) {
            console.log('Errore SQL:   ' + err.code);
            conDB(callback);
        }
        else {
            console.log('Connessione avvenuta al db ' + paramDB.database + '\n');
            if (callback !== undefined) callback(null);
        }
    });
};

// QUERY VARIE
var queryDB = function (query, callback) {
    con.query(query, function (err, result, fields) {
        if (err) console.log(err.code);
        else console.log(query + ': query avvernuta con successo!!!')
    });
};
var readDB = function (param, tbname, callback) {

     con.query('SELECT ' + getColumn(param) + ' FROM stage2018.' + tbname, function (err, result, fields) {
        if (err) {
            console.log('Errore SQL:   ' + err.code);
            if (callback !== undefined) callback(null, tbname);
        }
        else {
            console.log('Lettura avvernuta con successo\n');
            if (callback !== undefined) callback(null,fields, tbname);
        }
    });

};
var createTableDB = function (tbname, callback) {
    var sql = "CREATE TABLE " + tbname + " (IdRows INT PRIMARY KEY AUTO_INCREMENT," + createColumns() + " )";
    console.log('Creazione tabella "' + tbname + '"....');
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log('Errore SQL:   ' + err.code);
            if (callback !== undefined) callback(null, tbname);
        }
        else {
            console.log('...tabella creata\n');
            if (callback !== undefined) callback(null, tbname);
        }
    });
};
var dropTableDB = function (tbName, callback) {
    con.query("DROP TABLE " + tbName, function (err, result, fields) {
        if (err) {
            console.log('Errore SQL:   ' + err.code);
            if (callback !== undefined) callback(null, tbname);
        }
    });
};
var fillTableDB = function (array, tbname, callback) {
    var sql;
    var colums = getColumns();
    console.log('Riempio la tabella ' + tbname + '...\n');
    async.waterfall([
        function (callback) {
            for (i in array.records) {
                sql = 'INSERT INTO stage2018.' + tbname + '(IdRows,' + colums + ') VALUES (' + creteValue(array.records, i) + ')';
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log('Errore SQL:   ' + err.code);
                        if (callback !== undefined) callback(null, tbname);
                    }
                    else console.log('Row Inserita');
                });
                i++;
            }
            console.log('...fine riempimento');
        }
    ]);
    callback(null);
};
/*var updateRecordDB = function () {

};*/

var getColumn = function (string) {
    var array = string.split('|');
    var newString = '';
    for (var i = 0; i < array.length; i++) {
        if (i !== (array.length - 1)) newString = newString + array[i] + ',';
        else newString = newString + array[i];
    }
    return newString;
};
var getColumns = function () {
    var string = 'Id"AccountNumber"AccountSource"Active__c"AnnualRevenue"BillingCity"BillingCountry"BillingGeocodeAccuracy"BillingLatitude"BillingLongitude"BillingPostalCode"BillingState"BillingStreet"CleanStatus"CreatedDate"CustomerPriority__c"Description"DunsNumber"Fax"Industry"IsDeleted"Jigsaw"JigsawCompanyId"LastActivityDate"LastModifiedDate"LastReferencedDate"LastViewedDate"NaicsCode"NaicsDesc"Name"NumberOfEmployees"NumberofLocations__c"Ownership"Phone"PhotoUrl"Rating"SLAExpirationDate__c"SLASerialNumber__c"SLA__c"ShippingCity"ShippingCountry"ShippingGeocodeAccuracy"ShippingLatitude"ShippingLongitude"ShippingPostalCode"ShippingState"ShippingStreet"Sic"SicDesc"Site"SystemModstamp"TickerSymbol"Tradestyle"Type"UpsellOpportunity__c"Website"YearStarted';
    var array = string.split('"');
    var newString = '';
    for (var i = 0; i < array.length; i++) {
        if (i !== (array.length - 1)) newString = newString + array[i] + ',';
        else newString = newString + array[i];
    }
    return newString;
};

var createColumns = function () {
    var string = 'Id"AccountNumber"AccountSource"Active__c"AnnualRevenue"BillingCity"BillingCountry"BillingGeocodeAccuracy"BillingLatitude"BillingLongitude"BillingPostalCode"BillingState"BillingStreet"CleanStatus"CreatedDate"CustomerPriority__c"Description"DunsNumber"Fax"Industry"IsDeleted"Jigsaw"JigsawCompanyId"LastActivityDate"LastModifiedDate"LastReferencedDate"LastViewedDate"NaicsCode"NaicsDesc"Name"NumberOfEmployees"NumberofLocations__c"Ownership"Phone"PhotoUrl"Rating"SLAExpirationDate__c"SLASerialNumber__c"SLA__c"ShippingCity"ShippingCountry"ShippingGeocodeAccuracy"ShippingLatitude"ShippingLongitude"ShippingPostalCode"ShippingState"ShippingStreet"Sic"SicDesc"Site"SystemModstamp"TickerSymbol"Tradestyle"Type"UpsellOpportunity__c"Website"YearStarted';
    var array = string.split('"');
    var newString = '';
    for (var i = 0; i < array.length; i++) {
        if (i !== (array.length - 1)) newString = newString + array[i] + ' VARCHAR(30) ' + ',';
        else newString = newString + array[i] + ' VARCHAR(30) ';
    }
    return newString;
};
var creteValue = function (array, i) {
    var str = '""';
    var x = array[i];
    for (attr in x) {
        if (attr != 'attributes') {
            if (x[attr] == null) str = str + ',"' + "" + '"';
            else str = str + ',"' + x[attr] + '"';
        }
    }
    return str;
};
// FINE QUERY

exports.conDB = conDB;

exports.queryDB = queryDB;
exports.createTableDB = createTableDB;
exports.readDB = readDB;
exports.dropTableDB = dropTableDB;
exports.fillTableDB = fillTableDB;
exports.updateRecordDB = updateRecordDB;
