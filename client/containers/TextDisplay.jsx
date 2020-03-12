import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updatePosition, addError } from '../actions/textActions';
import Character from '../components/Character.jsx';
import keyHandler from '../helpers/eventHandlers';

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Hello world' };
    document.onkeydown = (event) => keyHandler(event, this.state.text, this.props);
  }

  render() {
    const statefullText = [];

    for (let i = 0; i < this.state.text.length; i++) {
      let color = '';
      if (this.props.position > i) {
        if (this.props.errors[i]) color = 'red';
        else color = 'green';
      } else color = 'grey';

      statefullText.push(<Character key={`char_${i}`} color={color} value={this.state.text[i]} />);
    }
    return (
      <Fragment>
        <div>TextDisplay</div>
        {statefullText}
      </Fragment>
    );
  }
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
