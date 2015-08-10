var exec = require("child_process").exec;
var $ = require("jquery");
function execute(command, callback)
{
	exec(command, function(error, stdout, stderr){ callback(stdout); });
}

function BatteryMonitor(element)
{
	this.element = element;
	var that = this;

	this.update();
	setInterval(function()
	{
		that.update();
	}, 1000);
};

BatteryMonitor.prototype.update = function()
{
	var that = this;
	execute("acpi -b | grep -oP '\\d+%' | grep -oP '\\d+'", function(battery_info)
		{
			var percent = Number(battery_info);
			var blocks = Math.round(percent / 10);
			that.element.find(".charge-percent>span").text(percent);
			that.element.find(".charge-blocks").children().css("opacity",
					function(index)
					{
						return (index >= blocks ? 0 : 1);
					});
		});
};


module.exports = BatteryMonitor;

