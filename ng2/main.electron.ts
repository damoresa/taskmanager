import * as electron from 'electron';

// browser-window creates a native window
console.log(' Launching ');
const app = electron.app;
const browserWindow = electron.BrowserWindow;
let mainWindow;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    console.log(' Starting ');
    // Initialize the window to our specified dimensions
    mainWindow = new browserWindow({ width: 1200, height: 900 });

    let indexPath: string = 'file://' + __dirname + '/index.html';
    console.log(' Index path ' + indexPath);
    // Tell Electron where to load the entry point from
    mainWindow.loadURL(indexPath);

    // Clear out the main window when the app is closed
    mainWindow.on('closed', function () {
        mainWindow = null;

    });

});