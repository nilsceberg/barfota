# barfota
Barfota is a simple bar written using [Electron](http://electron.atom.io/). As such, its widgets are created in HTML, CSS and JavaScript with node.js.
It is, as it were, *not lightweight*.


## Dependencies
* **electron**
* bower:
  * **normalize.css**
* node.js modules:
  * **jquery**
  * **extend**


## Usage
Make sure Node and Bower are installed. When in the barfota directory, run `npm install && bower install`. Then run barfota with `./barfota start`.


## Configuration
![alt text](http://i.imgur.com/8NWQdEp.png "example bar configuration")
<sup>Widgets in example, left to right: [bspwm](https://github.com/baskerville/bspwm) workspace indicator, screen brightness slider, clock, volume slider, battery monitor.</sup>

Barfota is configured using the files `layout.html`, `appearance.css` and `config.json` in the `~/.config/barfota` directory.

### config.json
`config.json` is used to configure the Electron window. Example file:
```json
{
 "window":
 {
  "x": 30,
  "y": 30,
  "width": 3160,
  "height": 70
 }
}
```

See the [documentation of electron's browser-window](https://github.com/atom/electron/blob/master/docs/api/browser-window.md) for the full list of available options.

### layout.html
`layout.html` defines the HTML structure of the bar contents. Its content is loaded into the barfota 'root' DIV element (body>div). Once loaded, barfota searches through the document for DIV tags with the `widget` class and loads the widget specified in the ID attribute.

Example file:
```html
<div class="widget" id="clock">
</div>
<div class="widget" id="battery-monitor">
</div>
<div class="widget" id="bspwm-workspaces">
</div>
<div class="widget" id="volume-control">
</div>
<div class="widget" id="brightness-control">
</div>
```

### appearance.css
Unsurprisingly, `appearance.css` describes the appearance of barfota. Remember that the root DIV can be referenced by `body>div`, and that it contains the user-defined HTML structure.

Example file:
```css
body>div
{
	background-color: rgba(32, 32, 32, 0.9);
	color: #cccccc;
	font-family: "Terminus (TTF)";
	font-weight: 100;
	font-size: 32px;
	vertical-align: middle;

	display: flex;
	align-items: center;
}

#battery-monitor
{
	height: 100%;
	position: absolute;
	right: 30px;
	display: flex;
	align-items: center;
}

#clock
{
	margin-left: auto;
	margin-right: auto;
}

#bspwm-workspaces
{
	height: 100%;
	position: absolute;
	left: 30px;
	display: flex;
	align-items: center;
}

#volume-control
{
	height: 100%;
	position: absolute;
	right: 1000px;
	display: flex;
	align-items: center;
}

#brightness-control
{
	height: 100%;
	position: absolute;
	left: 1000px;
	display: flex;
	align-items: center;
}
```

These example files result in the bar configuration pictured above, aside from the fact that the `bspwm-workspaces` widget is not included. Keep in mind that they're tailored to
a HiDPI screen and need to be adjusted for smaller screens.


## Widgets
When a widget is loaded, barfota first looks for `~/.config/barfota/widgets/<name>` and if the widget cannot be found there, it looks for `/path/to/barfota/widgets/<name>`. A widget is defined by its `layout.html`, `style.css` and `main.js`. The first two work in a similar way to the `layout.html` and `appearance.css` described above. `main.js` is a node module which should export a constructor.

### Example widget: bspwm-workspaces

**layout.html**:
```html
[&nbsp;<span>
	<span class="workspace-indicator-block">&#9632;</span>
	<span class="workspace-blocks">
		<span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span>
	</span>
</span>&nbsp;]
```

**style.css**:
```css
#bspwm-workspaces
{
	font-size: 50px;
}

#bspwm-workspaces>span
{
	position: relative;
}

#bspwm-workspaces .workspace-blocks
{
	position: relative;
	color: #cccccc;
	opacity: 0.1;
}

#bspwm-workspaces .workspace-indicator-block
{
	position: absolute;
}
```

**main.js**:
```javascript
var exec = require("child_process").exec;
var spawn = require("child_process").spawn;
var $ = require("jquery");
function execute(command, callback)
{
	exec(command, function(error, stdout, stderr){ callback(stdout); });
}

function WorkspaceIndicator(element)
{
	this.element = element;
	this.indicatorBlock = element.find(".workspace-indicator-block");

	this.subscriber = spawn("bspc", ["subscribe", "desktop"]);

	var that = this;
	this.subscriber.stdout.on('data', function (data) {
		that.parseState(data);
	});
};

WorkspaceIndicator.prototype.parseState = function(state)
{
	var workspaceIndex = Number(state.toString().split(" ").slice(-1)[0]) - 1;
	this.setWorkspace(workspaceIndex);
}


WorkspaceIndicator.prototype.setWorkspace = function(index)
{
	this.indicatorBlock.stop();
	this.indicatorBlock.animate({left: index * 25}, 200);
};


module.exports = WorkspaceIndicator;
```


## Included widgets
The following widgets are included with barfota:
* **clock**
* **brightness-control** (requires `xbacklight`)
* **volume-control** (requires `amixer`; swiftly hacked together - works sporadically)
* **battery-monitor** (requires `acpi` and `perl`)


## License
This project is licensed under the terms of the MIT license.
