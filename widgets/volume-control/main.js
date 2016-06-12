var exec = require("child_process").exec;
var $ = require("jquery");
function execute(command, callback)
{
	exec(command, function(error, stdout, stderr){ callback(stdout); });
}

function VolumeControl(element)
{
	this.element = element;
	var that = this;

	this.element.find(".slider-blocks").children().mousedown(function(element)
		{
			var volume = $(element.target).index() * 10 + 10;
			exec("amixer set Master " + volume + "%");
			that.setSlider(volume);
		});

	this.update();
	
	setInterval(function()
	{
		that.update();
	}, 5000);
};

VolumeControl.prototype.update = function()
{
	var that = this;
	execute("amixer | grep -m1 'Front Left: Playback' | grep -oP '\\d+%' | grep -oP '\\d+'", function(volume_info)
		{
			var percent = Number(volume_info);
			that.setSlider(percent);
		});
}

VolumeControl.prototype.setSlider = function(percent)
{
	var blocks = Math.round(percent / 10);
	this.element.find(".slider-blocks").children().toggleClass(
			function(index)
			{
				return (index < blocks ?
						"slider-unit" : "slider-unit-inactive");
			}, true);
	this.element.find(".slider-blocks").children().toggleClass(
			function(index)
			{
				return (index < blocks ?
						"slider-unit-inactive" : "slider-unit");
			}, false);
};


module.exports = VolumeControl;

