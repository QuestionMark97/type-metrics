import React from 'react';
import { connect } from 'react-redux';
import { recalcWPM, recalcMSD } from '../actions/metricsActions';

function MetricsDisplay(props) {
  return (
    <div>MetricsDisplay</div>
  );
}

function mapStateToProps(state) {
  return {
    WPM: state.metrics.WPM,
    MSD: state.metrics.MSD
  };
}

function mapDispatchToProps(dispatch) {
  return {
    recalcWPM: (...args) => dispatch(recalcWPM(...args)),
    recalcMSD: (...args) => dispatch(recalcMSD(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricsDisplay);
