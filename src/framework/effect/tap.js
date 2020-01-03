/**
 * 基于timeline的分步动画，分步操作css/js等
 * @param target 操作目标
 * @param style the new style to adopt
 * @param duration
 * @returns {tap|TapCollector} Handler for chained execution
 */
export function tap(target, style, duration) {
  // debugger
  if (!(this instanceof TapCollector)) {
    let collector = new TapCollector();
    collector.tap(target, style, duration);
    return collector;
  } else {
    return this;
  }
}

/**
 * Tap's each step handler
 * @constructor
 */
function TapCollector() {
  this.taps = [];
  this.started = false;
  this.lastTarget = undefined;
  this.tap = function (target, style, duration) {
    // Add step to task list
    this.taps.push({
      target, payload: style, duration
    });

    // If not started, start to pipe out the tasks.
    if (!this.started) {
      this.start()
    }
    return this;
  };

  this.start = function () {
    this.started = true;
    this.pipeOut()
  };

  this.pipeOut = function () {
    if (this.taps.length > 0) {
      // Get a tap.
      let tap = this.taps.shift();
      // If its payload is a callback, call it.
      if (tap.payload instanceof Function) {
        tap.payload();
      } else {
        Object.keys(tap.payload).forEach(key => {
          const target = tap.target || this.lastTarget;
          target.style[key] = tap.payload[key]
        });
      }
      this.lastTarget = tap.target;
      //set timeout to trigger next pipe out.
      setTimeout(() => {
        this.pipeOut()
      }, tap.duration)
    } else {

    }
  }
}
