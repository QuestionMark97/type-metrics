import React from 'react';

function ErrDisplay(props) {
  return (
    <div id='err-display'>
      <span>ERR: </span>
      <span>{props.errCount}</span>
    </div>
  );
}

export default ErrDisplay;
