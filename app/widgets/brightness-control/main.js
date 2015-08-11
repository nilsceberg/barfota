var exec = require("child_process").exec;
var $ = require("jquery");
function execute(command, callback)
{
	exec(command, function(error, stdout, stderr){ callback(stdout); });
}

function BrightnessControl(element)
{
	this.element = element;
	var that = this;

	this.update();
	this.element.find(".slider-blocks").children().mousedown(function(element)
		{
			that.setBrightness((9 - $(element.target).index()) * 10 + 10);
		});
};

BrightnessControl.prototype.setBrightness = function(percent)
{
	exec("xbacklight -set " + percent);
	this.setSlider(percent);
}

BrightnessControl.prototype.update = function()
{
	var that = this;
	execute("xbacklight -get", function(brightness)
		{
			var percent = Number(brightness);
			that.setSlider(percent);
		});
}

BrightnessControl.prototype.setSlider = function(percent)
{
	var blocks = Math.round(percent / 10);
	this.element.find(".slider-blocks").children().css("opacity",
			function(index)
			{
				return ((9 - index) < blocks ? 1 : 0.1);
			});
};


module.exports = BrightnessControl;

