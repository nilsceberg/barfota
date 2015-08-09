var exec = require("child_process").exec;
var $ = require("jquery");
function execute(command, callback)
{
	exec(command, function(error, stdout, stderr){ callback(stdout); });
}

$(function()
{
	setInterval(function()
			{
				execute("acpi", function(battery_info)
						{
							$("#battery-monitor").text(battery_info);
						});
			}, 1000);
});

