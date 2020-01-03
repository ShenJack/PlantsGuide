import {colorToRgb, is} from "./color";
import {getUnit} from "./util";
import {tap} from "./tap";
export interface CircularAnimationItem {
  target?: string,
  initial?: any,
  from: any,
  to: any,
  duration?: number,
}
const REMatchNumber = /\d+/;

const defaultTimeout = 250;
const defaultInterval = 13;

function animate(parent: Node, animations: CircularAnimationItem[]) {
  return new Promise((resolve, reject) => {
    let startTime = new Date().valueOf();
    let timer = setInterval(() => {
      if (new Date().valueOf() - startTime > defaultTimeout) {
        resolve();
        clearInterval(timer)
      }

      animations.forEach(animation => {
        let percent = (new Date().valueOf() - startTime) / (animation.duration || defaultTimeout);
        percent = percent * percent;
        if (animation.target !== undefined) {
          parent.querySelectorAll(animation.target).forEach(node => {
            Object.keys(animation.from).forEach(key => {
              if (animation.to.hasOwnProperty(key)) {
                node.style[key] = mapPercentToSize(node, animation.from[key], animation.to[key], Math.min(percent, 1))
              }
            })
          })
        } else {

          Object.keys(animation.from).forEach(key => {
            if (animation.to.hasOwnProperty(key)) {
              parent.style[key] = mapPercentToSize(parent, animation.from[key], animation.to[key], Math.min(percent, 1))
            }
          })
        }
      })
    }, defaultInterval)
  })
}

function revert(parent: Node, animations: CircularAnimationItem[]) {
  return new Promise((resolve, reject) => {
      let startTime = new Date().valueOf();
      let timer = setInterval(() => {
        if (new Date().valueOf() - startTime > defaultTimeout) {
          clearInterval(timer);
          resolve()
        }
        animations.forEach(animation => {
          if (animation.target !== undefined) {
            parent.querySelectorAll(animation.target).forEach(node => {
              Object.keys(animation.to).forEach(key => {
                if (animation.from.hasOwnProperty(key)) {
                  node.style[key] = mapPercentToSize(node, animation.to[key], animation.from[key],
                    Math.min((new Date().valueOf() - startTime) / (animation.duration || defaultTimeout), 1), key)
                }
              })
            })
          } else {
            Object.keys(animation.to).forEach(key => {
              if (animation.from.hasOwnProperty(key)) {
                parent.style[key] = mapPercentToSize(parent, animation.to[key], animation.from[key],
                  Math.min((new Date().valueOf() - startTime) / (animation.duration || defaultTimeout), 1), key)
              }
            })
          }
        })
      }, defaultInterval)
    }
  )
}

function initialize(target: Node, animations: CircularAnimationItem[]) {
  animations.forEach(animation => {
    if (animation.target !== undefined) {
      target.querySelectorAll(animation.target).forEach(node => {
        Object.keys(animation.from).forEach(key => {
          node.style[key] = animation.from[key]
        })
      })
    } else {
      Object.keys(animation.initial || animation.from).forEach(key => {
        if (animation.to.hasOwnProperty(key)) {
          target.style[key] = animation.from[key]
        }
      })
    }
  })
}

function effect() {

}

effect.animate = animate;
effect.initialize = initialize;
effect.revert = revert;
effect.tap = tap;

export {effect}

function mapPercentToSize(node: Element, source: string | number, target: string | number, percent: number, key: string) {
  let matchNumber = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  try {

    source = source.toString();
    target = target.toString();

    if (is.col(source)) {
      let sourceArray = colorToRgb(source).split(',').map(item => parseFloat(item.match(/(\d|\.)+/g)[0]));
      let targetArray = colorToRgb(target).split(',').map(item => parseFloat(item.match(/(\d|\.)+/g)[0]));
      let color = ("rgba(" + (sourceArray[0] + (targetArray[0] - sourceArray[0]) * percent)
        + "," + (sourceArray[1] + (targetArray[1] - sourceArray[1]) * percent)
        + "," + (sourceArray[2] + (targetArray[2] - sourceArray[2]) * percent)
        + "," + (sourceArray[3] + (targetArray[3] - sourceArray[3]) * percent) + ")");
      return color;
    }

    let [startNumber] = source.match(matchNumber);
    startNumber = parseFloat(startNumber);
    let startUnit = getUnit(source);
    let [endNumber] = target.match(matchNumber);
    endNumber = parseFloat(endNumber);
    let endUnit = getUnit(target);

    //单位一致
    if (endUnit === undefined && startUnit !== endUnit) {
      endUnit = startUnit;
    } else if (startUnit === undefined && endUnit !== startUnit) {
      startUnit = endUnit;
    }


    if (startUnit === '%' && endUnit === 'px') {
      if (['top', 'bottom', 'height'].includes(key)) {
        if (node.parentNode) {
          startNumber = node.parentNode.getBoundingRect().height * startNumber / 100;
        } else {
          startNumber = window.outerHeight * startNumber / 100;
        }
      } else if (['left', 'right', 'width'].includes(key)) {
        if (node.parentNode) {
          startNumber = node.parentNode.getBoundingRect().width * startNumber / 100;
        } else {
          startNumber = window.outerWidth * startNumber / 100;
        }
      }
    }

    if (startUnit === 'px' && endUnit === '%') {
      if (['top', 'bottom', 'height'].includes(key)) {
        if (node.parentNode) {
          startNumber = startNumber / node.parentNode.getBoundingRect().height * 100;
        } else {
          startNumber = startNumber / window.outerHeight * 100;
        }
      } else if (['left', 'right', 'width'].includes(key)) {
        if (node.parentNode) {
          startNumber = startNumber / node.parentNode.getBoundingRect().width * 100;
        } else {
          startNumber = startNumber / window.outerWidth * 100;
        }
      }
    }

    return (startNumber + (endNumber - startNumber) * percent).toFixed(2) + (endUnit || '');
  } catch (e) {
    console.log({source, target});
    console.log(e);
  }
}
