import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePosition, addError, resetText, getMarkovChain } from '../actions/textActions';
import { updateInput } from '../actions/metricsActions';
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

function mapStateToProps(state) {
  return {
    text: state.text.text,
    position: state.text.position,
    errors: state.text.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forward: (...args) => dispatch(updatePosition(1, ...args)),
    back: (...args) => dispatch(updatePosition(-1, ...args)),
    addError: (...args) => dispatch(addError(...args)),
    inputForward: (...args) => dispatch(updateInput(1, ...args)),
    inputBack: (...args) => dispatch(updateInput(-1, ...args)),
    resetText: (...args) => dispatch(resetText(...args)),
    getMarkovChain: (...args) => dispatch(getMarkovChain(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
