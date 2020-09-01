import React from 'react';

function MsdDisplay(props) {
  return (
    <div id='msd-display'>
      <span>ERR: </span><span>{props.MSD}</span>
    </div>
  );
}

export default MsdDisplay;
