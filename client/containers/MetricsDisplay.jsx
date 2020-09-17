import React from 'react';
import { connect } from 'react-redux';
import WpmDisplay from '../components/WpmDisplay.jsx';
import ErrDisplay from '../components/ErrDisplay.jsx';

function MetricsDisplay(props) {
  return (
    <div id='metrics-container'>
    <div id='metrics-display'>
      <WpmDisplay wpm={props.wpm} />
      <ErrDisplay errCount={props.errCount} />
    </div>
    </div>
  );
}

function mapStateToProps({ text: state }) {
  return {
    text: state.text,
    position: state.position,
    wpm: state.wpm,
    errCount: state.errCount,
    startTime: state.startTime
  };
}

export default connect(mapStateToProps)(MetricsDisplay);
