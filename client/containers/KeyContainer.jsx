import React from 'react';
import { connect } from 'react-redux';
import Key from '../components/Key.jsx';
import KeyData from '../components/KeyData.jsx';

function KeyContainer(props) {
  const { char } = props;
  const speed = props.speeds[char] || { avgTime: 0, cpm: 0, relSpeed: 0 };
  const errors = props.errors[char] || { avgErr: 0, dispRelErr: 0 };
  return (
    <div className="key-container">
      <Key color={props.colors[char]} char={char} />
      <KeyData
        display={!!props.popups[char]}
        speed={speed}
        errors={errors}
        char={char}
      />
    </div>
  );
}

function mapStateToProps({ text: { keyboard: state } }) {
  return {
    colors: state.keyColors,
    speeds: state.keySpeeds,
    errors: state.keyAcc,
    popups: state.popups
  };
}

export default connect(mapStateToProps)(KeyContainer);
