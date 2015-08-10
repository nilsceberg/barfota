var remote = require("remote");
var $ = require("jquery");
var fs = require("fs");

app_root = remote.getGlobal("app_root");
config_dir = remote.getGlobal("config_dir");

function Bar()
{
	this.element = $("body>div");
	
	this.loadHTML(config_dir + "/layout.html");
	this.loadCSS(config_dir + "/appearance.css");
	
	this.loadWidgets();
}

Bar.prototype.loadCSS = function(file)
{
	$("<link/>", {
		rel: "stylesheet",
		type: "text/css",
		href: file
	}).appendTo("head");
};

Bar.prototype.loadHTML = function(file, to_element)
{
	try
	{
		(to_element || this.element).html(fs.readFileSync(file, { encoding: "utf8" }));
	}
	catch(e)
	{
		console.error("Failed to load HTML: " + file);
	}
};

Bar.prototype.loadJS = function(file, element)
{
	try
	{
		return new require(file)(element);
	}
	catch(e)
	{
		console.error("Failed to load JS: " + file + ".js");
	}
};

Bar.prototype.loadWidgets = function()
{
	var that = this;
	this.element.children().each(function(index, element)
			{
				console.log("Loading " + element.id);
				that.loadWidget(element.id, $(element));
			});
};

Bar.prototype.loadWidget = function(name, element)
{
	var dir = config_dir + "/widgets/" + name;
	if(!fs.existsSync(dir))
	{
		console.log("Looking in app directory for " + name + "...");
		dir = app_root + "/widgets/" + name;
	}

	this.loadHTML(dir + "/layout.html", element);
	this.loadCSS(dir + "/style.css");
	return this.loadJS(dir + "/main", element);
};

bar = null;
$(function()
{
	bar = new Bar();
});

