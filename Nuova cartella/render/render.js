var {ipcRenderer} = require('electron');
var async = require('async');


// Send async message to main process
ipcRenderer.send('async', 1);

// Listen for async-reply message from main process
ipcRenderer.on('async-reply', function (event, arg) {
    // Print 2
    console.log(arg);
// Send sync message to main process
    var mainValue = ipcRenderer.sendSync('sync', 3);
// Print 4
    console.log(mainValue);
});

// Listen for main message
ipcRenderer.on('ping', function (event, arg) {
    // Print 5
    console.log(arg);
// Invoke method directly on main process
    main.pong(6);
});


//test----------------------------------------------------------------
var nomi = ipcRenderer.sendSync('events', 'rqTbName');
console.log('nomi '+ nomi);
var pippo = customizza(nomi);
console.log('var pippo: '+pippo);

function backup (){
        console.log('ciaone: ' + 'Account');
        ipcRenderer.sendSync('backup', 'Account');
}
function update (tbName){
    ipcRenderer.sendSync('events', tbName);
}

//customizza('ciao,ciccio');


//test----------------------------------------------------------------
