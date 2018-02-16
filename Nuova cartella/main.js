const {app, BrowserWindow, ipcMain} = require('electron');
//const {dialog} = require('electron');


const path = require('path');
const url = require('url');
const async = require('async');

const AppMain = require('./lib/App.js');
const sf = require('./lib/SFLibrary.js');
const funcs = require('./lib/mainFunc.js');


//<<<<<<<<<<<<<<<<<<<<<<< per startare l'app .\node_modules\.bin\electron .

// Mantenere un riferimento globale dell'oggetto window, altrimenti la finestra verrà
// chiusa automaticamente quando l'oggetto JavaScript è raccolto nel Garbage Collector.
var win;

function createWindow() {

    AppMain.connect();
    // Creazione della finestra del browser.
    win = new BrowserWindow({frame: true});
    win.setResizable(false);
    // e viene caricato il file index.html della nostra app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.setMaximizable(false);
    // Apertura degli strumenti per sviluppatori.
    win.webContents.openDevTools()

    // Emesso quando la finestra viene chiusa.
    win.on('closed', function () {
        // Eliminiamo il riferimento dell'oggetto window;  solitamente si tiene traccia delle finestre
        // in array se l'applicazione supporta più finestre, questo è il momento in cui
        // si dovrebbe eliminare l'elemento corrispondente.
        win = null
    })
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on('ready', createWindow);

// Terminiamo l'App quando tutte le finestre vengono chiuse.
app.on('window-all-closed', function () {
    // Su macOS è comune che l'applicazione e la barra menù
    // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // Su macOS è comune ri-creare la finestra dell'app quando
    // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
    if (win === null) {
        createWindow()
    }
});

//      gestione eventi!!
ipcMain.on('events', function (event, res) {
    console.log('evento :' + res);
    switch (res) {
        case 'rqTbName': {
            console.log('richiesta nomi tabelle accettato...');
            async.waterfall([
                sf.getTablesName
            ], function (err, res_async) {
                event.returnValue = res_async;
            });
            break;
        }
        case 'backup': {
            console.log(res);
            break;
        }
        case 'pensiamoci': {
            break;
        }
    }

});
ipcMain.on('backup', function (event, res) {
console.log('ho ricevuto backup');
            async.waterfall([function(callback){
                callback(null,res);
            },
                funcs.scaricaTB
            ], function (err, res_async) {
                event.returnValue = res_async;
            });

});
