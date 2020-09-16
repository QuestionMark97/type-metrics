import React from 'react';

function KeyData(props) {
  const display = (props.display) ? 'block': 'none';
  return (
    <div className="popup-wrapper" style={{ display }}>
      <div className="popup">{props.char} popup</div>
    </div>
  );
}

export default KeyData;
