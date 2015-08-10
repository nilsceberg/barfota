var $ = require("jquery");

function Clock(element)
{
	this.element = element;
	var that = this;
	this.update();
	setInterval(function()
	{
		that.update();
	}, 1000);
}

Clock.prototype.update = function()
{
	var d = new Date();
	this.element.text(d.toTimeString().substr(0, 8));
};

module.exports = Clock;

