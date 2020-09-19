import React from 'react';

function KeyData(props) {
  const display = (props.display) ? 'block' : 'none';
  const { avgTime, cpm, relSpeed } = props.speed;
  const { avgErr, dispRelErr } = props.errors;
  return (
    <div className="popup-wrapper" style={{ display }}>
      <div className="popup hidden">
        <h2>{props.char}:</h2>
        <div>time: {avgTime.toFixed()}ms</div>
        <div>cpm: {cpm.toFixed()}</div>
        <div>relSpeed: {relSpeed.toFixed(2)}</div>
      </div>
      <div className="popup">
        <h2>{props.char}:</h2>
        <div>errors: {avgErr}</div>
        <div>relErr: {dispRelErr.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default KeyData;
