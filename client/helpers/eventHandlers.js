export function keyHandler(event, props) {
  if (event.keyCode === 8) {
    event.preventDefault();
    props.back();
    return false;
  }
  if (event.keyCode === 32 && props.position === 0) return false;
  if (event.keyCode === 32 || (event.keyCode >= 65 && event.keyCode <= 90)) {
    if (event.key !== props.text[props.position]) props.addError();
    props.forward();
  }
  if (props.position === 0) props.setTime();
  if (props.position === props.text.length - 1) {
    props.recalcWpm();
    props.recalcErr();
    props.recalcSpeed();
    props.resetText();
  }
  return true;
}

export function keydownHandler(event, props) {
  if (event.keyCode === 8) event.preventDefault();
  props.highlightKey(event.keyCode);
}

export function keyupHandler(event, props) {
  if (event.keyCode === 8) event.preventDefault();
  props.unhighlightKey(event.keyCode);
}
