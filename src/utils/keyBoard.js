import {offEvent, onEvent} from "./dom";

export const helpKeys = {
  ALT: "altKey",
  SHIFT: "shiftKey",
  CTRL: "ctrlKey",
};

export const keys = {
  Key_a: "a",
  Key_s: "s",
  Key_d: "d",
  Key_f: "f",
  Key_g: "g",
  Key_h: "h",
  Key_j: "j",
  Key_k: "k",
  Key_l: "l",
  Key_q: "q",
  Key_w: "w",
  Key_e: "e",
  Key_r: "r",
  Key_t: "t",
  Key_y: "y",
  Key_u: "u",
  Key_i: "i",
  Key_o: "o",
  Key_p: "p",
  Key_z: "z",
  Key_x: "x",
  Key_c: "c",
  Key_v: "v",
  Key_b: "b",
  Key_n: "n",
  Key_m: "m",
  Key_1: "1",
  Key_2: "2",
  Key_3: "3",
  Key_4: "4",
  Key_5: "5",
  Key_6: "6",
  Key_7: "7",
  Key_8: "8",
  Key_9: "9",
  key_0: "0",
  key_Esc: "Escape",
};

export function bindKey(key, callback): Cancelable {
  return bind(`${key}`, callback);
}

const bindingMap = new Map();

interface Cancelable {
  cancel: () => void;
}

export function bindCombination(
  helpKey,
  key,
  callback: KeyboardEvent => void,
): Cancelable {
  return bind(getBindCombinationKey(helpKey, key), callback);
}

function bind(key, callback): Cancelable {
  bindingMap.set(key, callback);
  if (bindingMap.size >= 1) {
    onEvent(document, "keydown", keyDownListener);
  }
  return {
    cancel() {
      cancel(key);
    },
  };
}

function cancel(key) {
  if (bindingMap.has(key)) {
    bindingMap.delete(key);
    if (bindingMap.size === 0) {
      offEvent(document, "keydown", keyDownListener);
    }
  }
}

function getBindCombinationKey(helpKey, key) {
  return `${helpKey}-${key}`;
}

// 统一的按键事件监听
function keyDownListener(event: KeyboardEvent) {
  const helpKey =
    (event.ctrlKey && helpKeys.CTRL) ||
    (event.shiftKey && helpKeys.SHIFT) ||
    (event.altKey && helpKeys.ALT);
  const {key} = event;
  if (helpKey && key) {
    if (bindingMap.has(getBindCombinationKey(helpKey, key))) {
      bindingMap.get(getBindCombinationKey(helpKey, key))(event);
    }
  } else if (key) {
    if (bindingMap.get(key)) {
      bindingMap.get(key)(event);
    }
  }
}

export function cancelBind(key) {
  cancel(key);
}

export function cancelBindCombination(helpKey, key) {
  cancel(getBindCombinationKey(helpKey, key));
}
