import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { recalcWPM, recalcMSD } from '../actions/metricsActions';
import WpmDisplay from '../components/WpmDisplay.jsx';
import MsdDisplay from '../components/MsdDisplay.jsx';

class MetricsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, intervalId: 0, str: '' };
    this.incrementTime = this.incrementTime.bind(this);
    document.onkeypress = (event) => this.timeHandler(this.props, this.incrementTime, event);
  }

  timeHandler(props, increment, event) {
    let str;
    if (event.keyCode === 8) str = this.state.str.slice(0, this.state.str.length - 1);
    else str = this.state.str + event.key;
    this.setState({ ...this.state, ...{ str } });
    if (props.position - 1 === 0) {
      this.setState({
        ...this.state,
        ...{ intervalId: setInterval(() => increment(), 10) }
      });
    }
    if (props.position === props.text.length) {
      clearInterval(this.state.intervalId);
      this.props.recalcWPM(props.text, this.state.time);
      this.props.recalcMSD(props.text, this.state.str);
    }
  }

  incrementTime() {
    this.setState({
      ...this.state,
      ...{ time: this.state.time + 1 }
    });
  }

  render() {
    return (
      <Fragment>
        <div>MetricsDisplay</div>
        <WpmDisplay WPM={this.props.WPM} />
        <MsdDisplay MSD={this.props.MSD} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    text: state.text.text,
    position: state.text.position,
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
