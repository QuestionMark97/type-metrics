import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/textActions';
import { recalcSpeed, recalcKeyAcc, unlockChar } from '../actions/keyboardActions';
import Character from '../components/Character.jsx';
import { keyHandler } from '../helpers/eventHandlers';

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    document.addEventListener('keydown', (event) => keyHandler(event, this.props));
    props.getMarkovChain();
  }

  render() {
    const statefullText = [];

    for (let i = 0; i < this.props.text.length; i++) {
      let color = '';
      if (this.props.position > i) {
        if (this.props.errors[i]) color = 'red';
        else color = 'green';
      } else color = 'grey';

      statefullText.push(<Character key={`char_${i}`} color={color} value={this.props.text[i]} />);
    }
    return (
      <div id='text-display'>
      <div id='text-title'>TextDisplay</div>
      <div id='text'>
        <div id='chars'>
        {statefullText}
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps({ text: state }) {
  return {
    text: state.text,
    position: state.position,
    errors: state.errors,
    startTime: state.startTime
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forward: (...args) => dispatch(actions.updatePosition(1, ...args)),
    back: (...args) => dispatch(actions.updatePosition(-1, ...args)),
    addError: (...args) => dispatch(actions.addError(...args)),
    resetText: (...args) => dispatch(actions.resetText(...args)),
    getMarkovChain: (...args) => dispatch(actions.getMarkovChain(...args)),
    setTime: (...args) => dispatch(actions.setTime(...args)),
    recalcWpm: (...args) => dispatch(actions.recalcWpm(...args)),
    recalcErr: (...args) => dispatch(actions.recalcErr(...args)),
    recalcSpeed: (...args) => dispatch(recalcSpeed(...args)),
    recalcKeyAcc: (...args) => dispatch(recalcKeyAcc(...args)),
    unlockChar: (...args) => dispatch(unlockChar(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
