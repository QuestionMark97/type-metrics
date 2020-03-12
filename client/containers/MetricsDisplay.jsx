import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  recalcWPM, recalcMSD, updateInput, setTime
} from '../actions/metricsActions';
import WpmDisplay from '../components/WpmDisplay.jsx';
import MsdDisplay from '../components/MsdDisplay.jsx';
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
        <WpmDisplay WPM={this.props.WPM} />
        <MsdDisplay MSD={this.props.MSD} />
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    text: state.text.text,
    position: state.text.position,
    WPM: state.metrics.WPM,
    MSD: state.metrics.MSD,
    startTime: state.metrics.startTime,
    input: state.metrics.input
  };
}

function mapDispatchToProps(dispatch) {
  return {
    recalcWPM: (...args) => dispatch(recalcWPM(...args)),
    recalcMSD: (...args) => dispatch(recalcMSD(...args)),
    forward: (...args) => dispatch(updateInput(1, ...args)),
    back: (...args) => dispatch(updateInput(-1, ...args)),
    setTime: (...args) => dispatch(setTime(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricsDisplay);
