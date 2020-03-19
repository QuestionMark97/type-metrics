import React from 'react';
import { connect } from 'react-redux';
import { keydownHandler, keyupHandler } from '../helpers/eventHandlers';
import { highlightKey, unhighlightKey } from '../actions/keyboardActions';
import KeyRow from '../components/KeyRow.jsx';

function Keyboard(props) {
  document.addEventListener('keydown', (event) => keydownHandler(event, props));
  document.addEventListener('keyup', (event) => keyupHandler(event, props));
  const rows = [];
  const keys = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];
  for (let i = 0; i < 3; i++) {
    rows.push(<KeyRow row={i} keys={keys[i]} key={`keyRow_${i}`} />);
  }
  return (
    <div id='keyboard-container'>
    <div id='keyboard'>
      {rows}
    </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    highlightKey: (...args) => dispatch(highlightKey(...args)),
    unhighlightKey: (...args) => dispatch(unhighlightKey(...args))
  };
}

export default connect(() => ({}), mapDispatchToProps)(Keyboard);
