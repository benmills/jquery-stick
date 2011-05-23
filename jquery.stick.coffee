$ = jQuery

$.fn.stick = (args) ->
  options =
    offset: 0
    target: null
    targetOffset: null
    onUnstick: null
    onStick: null

  options.offset = args if typeof args is "number"
  options = $.extend options, args if typeof args is "object"

  options.target = this
  options.states = 
    "static": "static",
    "fixed": "fixed"
  options.state = options.states.static

  resize = ->
    position_static() if options.state is options.states.fixed
    options.targetOffset = parseInt options.target.offset().top
    options.targetLeft = parseInt options.target.offset().left

    position_fixed() if options.state is options.states.fixed
    targetBottom = options.targetOffset + options.target.height()

    if $(window).height() < targetBottom
      options.disable = true;
      position_static() if options.state == options.states.fixed
    else
      options.disable = false
      scroll()

  position_fixed = ->
    options.target.css(
      "position":"fixed",
      "top": options.offset+"px",
      "left": options.targetLeft+"px",
    );

  position_static = ->
    options.target.css(
      "position":"static",
      "top": ""
    )

  scroll = ->
    return if options.disable

    if (options.targetOffset - $(this).scrollTop()) - options.offset <= 0
      options.onStick() if options.state == options.states.static && options.onStick
      position_fixed()
      options.state = options.states.fixed
    else
      options.onUnstick() if options.state == options.states.fixed && options.onUnstick
      position_static()
      options.state = options.states.static

  resize()
  $(window).scroll(scroll).resize(resize)
