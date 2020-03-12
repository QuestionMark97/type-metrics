export function keyHandler(event, props) {
  if (event.keyCode === 8) {
    props.back();
    props.inputBack();
    return false;
  }
  if (event.keyCode === 32 || (event.keyCode >= 65 && event.keyCode <= 90)) {
    if (event.key !== props.text[props.position]) props.addError();
    props.forward();
    props.inputForward(event.key);
  }
  return true;
}


export function timeHandler(event, props) {
  if (event.keyCode === 8) {
    event.preventDefault();
  }
  if (props.position === 0) props.setTime();
  if (props.position === props.text.length - 1) {
    props.recalcWPM(props.text, new Date() - props.startTime);
    props.recalcMSD(props.text, props.input + event.key);
  }
  return false;
}
