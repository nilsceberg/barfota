var $ = require("jquery");

function Clock(element)
{
	this.element = element;
	setInterval(function()
	{
		var d = new Date();
		element.text(d.toTimeString().substr(0, 8));
	}, 1000);
}

module.exports = Clock;

