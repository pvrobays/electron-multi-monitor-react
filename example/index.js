const electron = require('electron');
const { app } = electron;
const { MultiMonitor } = require('electron-multi-monitor')

const numberOfWindowsToOpen = 2;

let multiMonitor = null;

function onReady() {
    console.log("app ready");

    multiMonitor = MultiMonitor.instance;
    
    // const url = "https://google.com";
    // const url = "about:blank";
    const url = `file://${__dirname}/app/index.html`;
    
    multiMonitor.openUrl(url, numberOfWindowsToOpen).then(() => {
        console.log("Monitor windows are opened & loaded!");
    });
}

app.on('ready', onReady);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    
    multiMonitor = null;
});

app.on('activate', function() {
    if (multiMonitor === null) {
        onReady();
    }
});