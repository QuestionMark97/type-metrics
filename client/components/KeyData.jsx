import React from 'react';

function KeyData(props) {
  const display = (props.display) ? 'block' : 'none';
  const { avgTime, cpm, relSpeed } = props.speed;
  const { errors, relErr } = props.errors;
  return (
    <div className="popup-wrapper" style={{ display }}>
      <div className="popup">
        <h2>{props.char}:</h2>
        <div>time: {avgTime.toFixed()}ms</div>
        <div>cpm: {cpm.toFixed()}</div>
        <div>relSpeed: {relSpeed.toFixed(2)}</div>
        <div>errors: {errors}</div>
        <div>relErr: {relErr}</div>
      </div>
    </div>
  );
}

export default KeyData;
