var app = require("app");
var BrowserWindow = require("browser-window");
var fs = require("fs");
var extend = require("extend");

// global variables
var path = require('path');
global.app_root = path.resolve(__dirname);
global.config_dir = process.env.HOME + "/.config/barfota";

// reference to main window
var mainWindow = null;

// quit when all windows are closed
app.on('window-all-closed', function() {
	app.quit();
});

app.on('ready', function() {
	var config = JSON.parse(fs.readFileSync(config_dir + "/config.json", "utf8"));

	mainWindow = new BrowserWindow(
			extend({
				width: (3200-30*2), 
				height: 70,
				x: 30,
				y: 30,
				type: "dock",
				transparent: true,
				frame: false,
				resizable: false
			}, config.window));
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	//mainWindow.openDevTools({detach: true});

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
