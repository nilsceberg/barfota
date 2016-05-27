var net = require("net");
var carrier = require("carrier");

function Controller(port)
{
	console.log("Starting controller...");

	this.handlers = {}

	this.server = new net.Server();

	this.server.on("connection", (socket) => { this.read(socket); });
	this.server.listen(port);

	console.log("Controller started.");
}

Controller.prototype.on = function(command, handler)
{
	this.handlers[command] = handler;
}

Controller.prototype.read = function(socket)
{
	carrier.carry(socket, (line) => { this.onCommand(line); });
}

Controller.prototype.onCommand = function(command)
{
	command = command.split(" ");
	if(command[0] in this.handlers)
		this.handlers[command[0]](command.splice(1));
}

module.exports = Controller

