(function($){
  $.fn.stick = function(args){

    // Options
    var options = {
      offset: 0,
      target: null,
      targetOffset: null,
      staticCallback: null,
      fixedCallback: null,
    }

    // Populate Options
    if (typeof args == "number") {
      options.offset = args  
    } else if (typeof args == "object") {
      options = $.extend(options, args)   
    }

    // Private Methods

    var _resize = function(){
      if (options.state == options.states.fixed) _position_static()
      options.targetOffset = parseInt(options.target.offset().top)
      options.targetLeft = parseInt(options.target.offset().left)

      if (options.state == options.states.fixed) _position_fixed()

      // Check to see if the window is too small for the sticked objectf
      var targetBottom = options.targetOffset+options.target.height()

      if($(window).height() < targetBottom) {
        options.disable = true
        if (options.state == options.states.fixed) _position_static()
      } else {
        options.disable = false
        _scroll()
      }
    }

    var _position_fixed = function() {
      options.target.css({
        "position":"fixed",
        "top": options.offset+"px",
        "left": options.targetLeft+"px",
      })
    }
    
    var _position_static = function() {
      options.target.css({
        "position":"static",
        "top": ""
      })
    }

    var _scroll = function() {
      if (options.disable) return;

      if ((options.targetOffset - $(this).scrollTop()) - options.offset <= 0) {
        if (options.state == options.states.static && options.fixedCallback) options.fixedCallback()

        _position_fixed()
        options.state = options.states.fixed
      } else {
        if (options.state == options.states.fixed && options.staticCallback) 
          options.staticCallback()

        _position_static()
        options.state = options.states.static
      }
    }

    // Private Options

    options.target = this
    options.states = {
      "static": "static",
      "fixed": "fixed"
    }
    options.state = options.states.static

    // Init

    _resize()
    $(window).scroll(_scroll).resize(_resize)
  }
})(jQuery)
