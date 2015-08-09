var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	mainWindow = new BrowserWindow(
			{
				width: (3200-30*2), 
				height: 70,
				x: 30,
				y: 30,
				type: "dock",
				transparent: true,
				frame: false,
				resizable: false
			});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	// Open the devtools.
	//mainWindow.openDevTools({detach: true});

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
