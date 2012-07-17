$ = jQuery
STATIC = 'static'
FIXED = 'fixed'
$.fn.stick = (args) -> s = new Stick(this, args)

class Stick
  constructor: (@target, args) ->
    @offset = if typeof args is "number" then args else 0
    $.extend @, args if typeof args is "object"
    @state = STATIC
    @resize()
    ((s) -> $(window).scroll(-> s.scroll(this)).resize(-> s.resize(this)))(@)

  position: ->
    @target.css(
      "position": @state
      "top": @offset+"px"
      "left": @targetLeft+"px"
    )

  resize: ->
    @targetOffset = parseInt @target.offset().top
    @targetLeft = parseInt @target.offset().left
    targetBottom = @targetOffset + @target.height()

    if $(window).height() < targetBottom
      @disabled = true
      @position() if @state is FIXED
    else
      @disabled = false
      @scroll()

  scroll: (self) ->
    return if @disabled
    if (@targetOffset - $(self).scrollTop()) - @offset <= 0
      @onStick?() if @state is STATIC
      @state = FIXED
    else
      @onUnstick?() if @state is FIXED
      @state = STATIC
    @position()
