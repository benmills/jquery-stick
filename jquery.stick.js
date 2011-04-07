(function($){
  $.fn.stick = function(args){
    var options = {
      offset: 0,
      target: null,
      targetOffset: null,
    }

    if (typeof args == "number") {
      options.offset = args  
    } else if (typeof args == "object") {
      options = $.extend(options, args)   
    }

    options.target = this
    options.targetOffset = options.target.offset().top

    $(window).scroll(function(){
      if ((options.targetOffset - $(this).scrollTop()) - options.offset <= 0) {
        options.target.css({
          "position":"fixed",
          "top": options.offset+"px"
        })
      } else {
        options.target.css({
          "position":"static",
          "top": ""
        })
      }
    })
  }
})(jQuery)
