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
	execute(
			"acpi -b | perl -pe  \"s/.+?(Disc|C)harging, ([0-9]+)%.+/\\1\\n\\2/\"",
			function(battery_info)
		{
			battery_info = battery_info.split("\n");
			var percent = Number(battery_info[1]);
			var status = battery_info[0];
			var blocks = Math.round(percent / 10);

			if(status == "C")
				that.element.toggleClass("charging", true);
			else
				that.element.toggleClass("charging", false);
			
			that.element.find(".charge-percent>span").text(percent);
			that.element.find(".charge-blocks").children().css("opacity",
					function(index)
					{
						return (index >= blocks ? 0.1 : 1);
					});
		});
};


module.exports = BatteryMonitor;

