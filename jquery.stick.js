(function() {
  var $, FIXED, STATIC, Stick;

  $ = jQuery;

  STATIC = 'static';

  FIXED = 'fixed';

  $.fn.stick = function(args) {
    var s;
    return s = new Stick(this, args);
  };

  Stick = (function() {

    function Stick(target, args) {
      this.target = target;
      this.offset = typeof args === "number" ? args : 0;
      if (typeof args === "object") {
        $.extend(this, args);
      }
      this.state = STATIC;
      this.resize();
      (function(s) {
        return $(window).scroll(function() {
          return s.scroll(this);
        }).resize(function() {
          return s.resize(this);
        });
      })(this);
    }

    Stick.prototype.position = function() {
      return this.target.css({
        "position": this.state,
        "top": this.offset + "px",
        "left": this.targetLeft + "px"
      });
    };

    Stick.prototype.resize = function() {
      var targetBottom;
      this.targetOffset = parseInt(this.target.offset().top);
      this.targetLeft = parseInt(this.target.offset().left);
      targetBottom = this.targetOffset + this.target.height();
      if ($(window).height() < targetBottom) {
        this.disabled = true;
        if (this.state === FIXED) {
          return this.position();
        }
      } else {
        this.disabled = false;
        return this.scroll();
      }
    };

    Stick.prototype.scroll = function(self) {
      if (this.disabled) {
        return;
      }
      if ((this.targetOffset - $(self).scrollTop()) - this.offset <= 0) {
        if (this.state === STATIC) {
          if (typeof this.onStick === "function") {
            this.onStick();
          }
        }
        this.state = FIXED;
      } else {
        if (this.state === FIXED) {
          if (typeof this.onUnstick === "function") {
            this.onUnstick();
          }
        }
        this.state = STATIC;
      }
      return this.position();
    };

    return Stick;

  })();
})();