
/**
 * Module dependencies.
 */

var max = require('max')
  , min = require('min');

/**
 * Local dependencies.
 */
var LinearScale = require('linear-scale');


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

function Sparkline(canvas, yscale) {
  if (!canvas) throw new Error('sparkline canvas required');
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.yscale = yscale
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
  var xscale = new LinearScale([0, data.length-1], [0, w]);
  yscale = this.yscale || new LinearScale([_min, _max], [h, 0]);
  var y, yval, gap = false, first = true;
  canvas.width = w;
  ctx.beginPath();
  for (var i = 0; i < len; ++i) {
    if (typeof data[i] == "number") {
      yval = data[i];
      x = xscale.map(i)
      y = yscale.map(yval)
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
  }
  if(this.applyStyle) this.applyStyle(ctx);
  ctx.stroke();
};
