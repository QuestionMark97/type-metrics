import React from 'react';
import { connect } from 'react-redux';
import { updatePosition, addError } from '../actions/textActions';

function TextDisplay(props) {
  return (
    <div>TextDisplay</div>
  );
}

function mapStateToProps(state) {
  return {
    position: state.text.position,
    metrics: state.text.errors
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
