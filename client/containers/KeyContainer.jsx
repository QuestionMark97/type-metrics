import React from 'react';
import { connect } from 'react-redux';
import Key from '../components/Key.jsx';
import KeyData from '../components/KeyData.jsx';

function KeyContainer(props) {
  const [i, j] = props.positions;
  return (
    <div className="key-container">
      <Key positions={props.positions} colors={props.colors} char={props.char} />
      <KeyData display={props.colors[i][j][4]} char={props.char} />
    </div>
  );
}

function mapStateToProps({ text }) {
  return { colors: text.keyboard.keyColors };
}

export default connect(mapStateToProps)(KeyContainer);
