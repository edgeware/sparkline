
/**
 * Module dependencies.
 */

var max = require('max')
  , min = require('min');

/**
 * Expose `Sparkline`.
 */

module.exports = Sparkline;

/**
 * Initialize a sparkline with `canvas`.
 *
 * @param {Canvas} canvas
 * @api public
 */

function Sparkline(canvas) {
  if (!canvas) throw new Error('sparkline canvas required');
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
}

Sparkline.prototype.style = function (fn) {
  this.applyStyle = fn;
};

/**
 * Update `data`.
 *
 * @param {Array} data
 * @api public
 */

Sparkline.prototype.update = function(data){
  var canvas = this.canvas;
  var ctx = this.ctx;
  var len = data.length;
  var w = canvas.width;
  var h = canvas.height;
  var _max = max(data);
  var _min = min(data);
  var range = _max - _min;
  var sx = w / (len-1);
  var x = 0;
  var y, n, gap = false, first = true;
  canvas.width = w;
  ctx.beginPath();
  for (var i = 0; i < len; ++i) {
    if (typeof data[i] == "number") {
      n = data[i] - _min;
      y = h - h * ((n / range) || 0)
      if (!gap) {
        if (first) {
          ctx.moveTo(x, y);
          first = false
        } else {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y);
        gap = false;
      }
    } else {
      gap = true
    }
    x += sx
  }
  if(this.applyStyle) this.applyStyle(ctx);
  ctx.stroke();
};
