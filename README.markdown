# jQuery Stick

Stick is a simple plugin that will make an element stick in place as you scroll

```javascript
$('#menu').stick();
```

## Options

There are only a few options:

* offset: the distance from the top of the screen the element should be.
* onStick: a callback for when the element sticks.
* onUnstick: a callback when the element stops being sticky.

You can set the options by passing in an object:

```javascript
$("#menu").stick({
  offset: 10,
  onStick: function () {},
  onUnstick: function () {}
});
```

As a shortcut, you can pass an integer in and jquery-stick will use that as the offset value:

```javascript
$("#menu").stick(10);
```

## Examples

This plugin was made when I couldn't find a simple enough existing jquery plugin while I was building the latest version of [Braintree's documentation site](http://www.braintreepayments.com/docs/ruby). In this site I'm sticking two different elements, the sidebar menu and the top menu.

## License

Copyright (c) 2011 Ben Mills
Licensed under the MIT license
