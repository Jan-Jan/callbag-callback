/**
 * callbag-map
 * -----------
 *
 * Callbag operator that applies a transformation on data passing through it.
 * Works on either pullable or listenable sources.
 *
 * `npm install callbag-map`
 *
 * Example:
 *
 *     const fromIter = require('callbag-from-iter');
 *     const iterate = require('callbag-iterate');
 *     const map = require('callbag-map');
 *
 *     const source = callback((x,cb) => cb(null, x * 0.1))(fromIter([10,20,30,40]));
 *
 *     iterate(x => console.log(x))(source); // 1
 *                                           // 2
 *                                           // 3
 *                                           // 4
 */


const callback = f => source => (start, sink) => {
  if (start !== 0) return;
  source(0, (t, d) => {
    t === 1
      ? f(d, (err, result) => err ? sink(2, err) : sink(t, err || result))
      : sink(t, d)
  })
}


module.exports = callback;
