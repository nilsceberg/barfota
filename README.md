# barfota
Barfota is a simple bar written using [Electron](http://electron.atom.io/). As such, its widgets are created in HTML, CSS and JavaScript with node.js.
It is, as it were, *not lightweight*.


## Dependencies
* **electron**
* bower:
  * **normalize.css**
* node.js modules:
  * **jquery**


## Usage
When in the barfota directory, run with `./run.sh`. To run from other directories, use `electron --enable-transparent-visuals /path/to/barfota/app`.


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


## Included widgets
The following widgets are included with barfota:
* **clock**
* **brightness-control** (just a slider at the moment - doesn't do anything)
* **volume-control** (swiftly hacked together - works sporadically)
* **battery-monitor**


## License
This project is licensed under the terms of the MIT license.
