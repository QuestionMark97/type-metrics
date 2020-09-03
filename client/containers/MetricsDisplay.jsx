import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  recalcWpm, recalcErr, updateInput, setTime
} from '../actions/textActions';
import WpmDisplay from '../components/WpmDisplay.jsx';
import ErrDisplay from '../components/ErrDisplay.jsx';
import { timeHandler } from '../helpers/eventHandlers';

class MetricsDisplay extends Component {
  constructor(props) {
    super(props);
    document.addEventListener('keydown', (event) => timeHandler(event, this.props));
  }

  render() {
    return (
      <div id='metrics-container'>
      <div id='metrics-display'>
        <WpmDisplay wpm={this.props.wpm} />
        <ErrDisplay errCount={this.props.errCount} />
      </div>
      </div>
    );
  }
}

function mapStateToProps({ text: state }) {
  return {
    text: state.text,
    position: state.position,
    wpm: state.wpm,
    errCount: state.errCount,
    startTime: state.startTime,
    input: state.input
  };
}

function mapDispatchToProps(dispatch) {
  return {
    recalcWpm: (...args) => dispatch(recalcWpm(...args)),
    recalcErr: (...args) => dispatch(recalcErr(...args)),
    forward: (...args) => dispatch(updateInput(1, ...args)),
    back: (...args) => dispatch(updateInput(-1, ...args)),
    setTime: (...args) => dispatch(setTime(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricsDisplay);
