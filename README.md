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
Widgets in example, left to right: [bspwm](https://github.com/baskerville/bspwm) workspace indicator, screen brightness slider, clock, volume slider, battery monitor.


## Included widgets
The following widgets are included with barfota:
* **clock**
* **brightness-control** (just a slider at the moment - doesn't do anything)
* **volume-control** (swiftly hacked together - works sporadically)
* **battery-monitor**


## License
This project is licensed under the terms of the MIT license.
