# jQuery Fiji

## About

The jQuery Fiji project is a jQuery UI widget library that complements the jQuery UI project with widgets currently not available there.
This is not an official jQuery UI project, nor are we associated with the jQuery UI team in any way. All widgets were created for our own project needs in mind.

[Ticker Demo](http://medihack.github.com/jquery-fiji/demos/ticker/ticker.html)

## Widgets

### jQuery Fiji Ticker

A Twitter (when not logged in on the start page) like Ticker.
Fully compatible with the jQuery UI Theming framework.
Well configurable and fully Unit tested.

Uses the below initial HTML structure:

    <div id="#ticker">
      <ul>
        <li>Ticker Item 1</li>
        <li>Ticker Item 2</li>
        <li>Ticker Item 3</li>
      </ul>
    </div>

Start a simple rotating ticker:

    $("#ticker").ticker();

Several options for configuration:

    $("#ticker").ticker({
      active: true, // true if the ticker is active (scrolls), false otherwise (default true)
      initialTimeout: 2000,  // the initial timeout (in ms) to start the ticker after the site was loaded (default 4000)
      mouseOnTimeout: 6000,  // the timeout before the next item shows up when the mouse pointer is over the ticker (default 8000)
      mouseOffTimeout: 4000, // the timeout before the next item shows up when the mouse pointer is somewhere else (default 4000)
      scrollTime: 1200,  // the times it takes to scroll down the item list (default 800)
      fadeTime: 1000, // the time it takes to fade in the next item at the top of the item list (default 1000)
      fixContainer: true, // fixes the div by its initial height and sets its overflow to hidden (for sliding out effect) (default false)
      next: function(lastItem, nextItem) {  // this function provides a clone of the last item on the list that will be removed next
		return $("<li>next item</li>"); // the next item for the ticker can be returned
        // or
        nextItem($("<li>next item</li>")); // or be provided to the nextItem function (useful for asynchronous Ajax requests)
      }  // the next item must be wrapped in a <li> tag
    });

If the nextItem function was not called before the next scroll would take place then the next scroll is passed.

There are also several events fired:<br>
beforeScroll // directly before the ticker scrolls<br>
afterScroll // directly after the ticker scrolled<br>
afterFade // directly after the new item was faded in<br>

To bind to an event (the common jQuery UI way):

    $("#ticker").ticker({
      nextItem: function(lastItem, nextItem) { nextItem($('<li>TestItem</li>')); },
      beforeScroll: function(event, ui) { // just do what you like to do }
    });

We also provide some methods:<br>
stop // stop the ticker immediately (respectively after the scrolling/fading is finished)<br>
start // start the ticker again<br>

To call those methods (the common jQuery UI way):

    $("#ticker").ticker("stop");

## License

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html

Copyright(c) 2011 Kai Schlamp, Torsten Kühr, Wladimir Lukutin
