import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePosition, addError } from '../actions/textActions';
import Character from '../components/Character.jsx';
import keyHandler from '../helpers/eventHandlers';

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    document.onkeydown = (event) => keyHandler(event, this.props);
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
        <div>TextDisplay</div>
        {statefullText}
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
    addError: (...args) => dispatch(addError(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
