(function() {
  var $;
  $ = jQuery;
  $.fn.stick = function(args) {
    var options, position_fixed, position_static, resize, scroll;
    options = {
      offset: 0,
      target: null,
      targetOffset: null,
      onUnstick: null,
      onStick: null
    };
    if (typeof args === "number") {
      options.offset = args;
    }
    if (typeof args === "object") {
      options = $.extend(options, args);
    }
    options.target = this;
    options.states = {
      "static": "static",
      "fixed": "fixed"
    };
    options.state = options.states.static;
    resize = function() {
      var targetBottom;
      if (options.state === options.states.fixed) {
        position_static();
      }
      options.targetOffset = parseInt(options.target.offset().top);
      options.targetLeft = parseInt(options.target.offset().left);
      if (options.state === options.states.fixed) {
        position_fixed();
      }
      targetBottom = options.targetOffset + options.target.height();
      if ($(window).height() < targetBottom) {
        options.disable = true;
        if (options.state === options.states.fixed) {
          return position_static();
        }
      } else {
        options.disable = false;
        return scroll();
      }
    };
    position_fixed = function() {
      return options.target.css({
        "position": "fixed",
        "top": options.offset + "px",
        "left": options.targetLeft + "px"
      });
    };
    position_static = function() {
      return options.target.css({
        "position": "static",
        "top": ""
      });
    };
    scroll = function() {
      if (options.disable) {
        return;
      }
      if ((options.targetOffset - $(this).scrollTop()) - options.offset <= 0) {
        if (options.state === options.states.static && options.onStick) {
          options.onStick();
        }
        position_fixed();
        return options.state = options.states.fixed;
      } else {
        if (options.state === options.states.fixed && options.onUnstick) {
          options.onUnstick();
        }
        position_static();
        return options.state = options.states.static;
      }
    };
    resize();
    return $(window).scroll(scroll).resize(resize);
  };
}).call(this);
