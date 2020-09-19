import React from 'react';
import { connect } from 'react-redux';
import Key from '../components/Key.jsx';
import KeyData from '../components/KeyData.jsx';

function KeyContainer(props) {
  const [i, j] = props.positions;
  const speed = props.speeds[props.char] || { avgTime: 0, cpm: 0, relSpeed: 0 };
  const errors = props.errors[props.char] || { avgErr: 0, dispRelErr: 0 };
  return (
    <div className="key-container">
      <Key positions={props.positions} colors={props.colors} char={props.char} />
      <KeyData
        display={props.colors[i][j][4]}
        speed={speed}
        errors={errors}
        char={props.char}
      />
    </div>
  );
}

function mapStateToProps({ text: { keyboard } }) {
  return {
    colors: keyboard.keyColors,
    speeds: keyboard.keyTimes,
    errors: keyboard.keyAcc
  };
}

export default connect(mapStateToProps)(KeyContainer);
