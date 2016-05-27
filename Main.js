const app = require("app");
const BrowserWindow = require("browser-window");
var fs = require("fs");
var extend = require("extend");
var Controller = require("./Controller.js");

// global variables
var path = require('path');
global.app_root = path.resolve(__dirname);
global.config_dir = process.env.HOME + "/.config/barfota";

if(Number(process.argv[process.argv.length - 1]))
	global.controller =
		new Controller(Number(process.argv[process.argv.length - 1]));

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

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	global.controller.on("reload", () => { mainWindow.reload(); });
	global.controller.on("dev", () =>
			{ mainWindow.openDevTools({detach: true}); });
});

