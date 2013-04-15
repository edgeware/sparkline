
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
  var sx = w / len;
  var x = 0;
  var y, n, gap = false;
  canvas.width = w;
  ctx.beginPath();
  for (var i = 0; i < len; ++i) {
    x += sx
    if (typeof data[i] == "number") {
      n = data[i] - _min;
      y = h - h * ((n / range) || 0)
      if (!gap) {
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y);
        gap = false;
      }
    } else {
      gap = true
    }
  }
  if(this.applyStyle) this.applyStyle(ctx);
  ctx.stroke();
};
