let speed = 0.5;
let _percent = 0;

function loaded() {
  return _percent >= 1;
}

export function loading() {
  let loadingPath = document.getElementById('loadingPath');
  let buttonHeight = 100;
  let animationPercent = 0;
  nextFrame(undefined, loadingPath, buttonHeight, 0, _percent)
}

export function updateLoadingStatus(percent) {
  let loadingPath = document.getElementById('loadingPath');
  _percent = percent;
}

function nextFrame(lastTime, loadingPath, buttonHeight, animationStartPercent, animationPercent) {
  requestAnimationFrame(time => {
    // animationPercent = animationPercent + (time - lastTime) / 1000 * speed;
    // console.log((((time - lastTime) / 1000) * speed))
    if (lastTime == null) {
      lastTime = time;
    }
    animationStartPercent = animationStartPercent + (((time - lastTime) / 1000) * speed);

    animationPercent = _percent;

    let d = partialCircle(
      ((buttonHeight + 8) / 2),
      ((buttonHeight + 8) / 2),
      ((buttonHeight) / 2),
      2 * Math.PI * (animationStartPercent),
      2 * Math.PI * ((animationStartPercent + animationPercent)));
    loadingPath.setAttribute('d', d);
    if (!loaded()) {
      nextFrame(time, loadingPath, buttonHeight, animationStartPercent, animationPercent)
    }
  })
}

function partialCircle(cx, cy, r, start, end) {
  const length = end - start;
  if (length === 0) return '';

  const fromX = r * Math.cos(start - Math.PI / 2) + cx;
  const fromY = r * Math.sin(start - Math.PI / 2) + cy;
  const toX = r * Math.cos(end - Math.PI / 2) + cx;
  const toY = r * Math.sin(end - Math.PI / 2) + cy;
  const large = Math.abs(length) <= Math.PI ? '0' : '1';
  const sweep = length < 0 ? '0' : '1';

  return [
    ['M', fromX, fromY].join(' '),
    ['A', r, r, 0, large, sweep, toX, toY].join(' ')
  ].join(' ')
}

