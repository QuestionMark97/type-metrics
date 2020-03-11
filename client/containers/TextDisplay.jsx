import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updatePosition, addError } from '../actions/textActions';
import Character from '../components/Character.jsx';

function TextDisplay(props) {
  const text = 'Hello world';
  const statefullText = [];

  for (let i = 0; i < text.length; i++) {
    let color = '';
    if (props.position > i) {
      if (props.errors[i]) color = 'red';
      else color = 'green';
    } else color = 'grey';

    statefullText.push(<Character key={`char_${i}`} color={color} value={text[i]} />);
  }

  return (
    <Fragment>
      <div>TextDisplay</div>
      {statefullText}
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    position: state.text.position,
    errors: state.text.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forward: (...args) => dispatch(updatePosition(1, ...args)),
    back: (...args) => dispatch(updatePosition(-1, ...args)),
    addError: (...args) => dispatch(addError(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
