export default function keyHandler(event, props) {
  if (event.keyCode === 8) {
    props.back();
    return false;
  }
  if (event.keyCode === 32 || (event.keyCode >= 65 && event.keyCode <= 90)) {
    if (event.key !== props.text[props.position]) props.addError();
    props.forward();
  }
  return true;
}
