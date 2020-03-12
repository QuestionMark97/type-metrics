import React from 'react';

function MsdDisplay(props) {
  return (
    <div id='msd-display'>
      <span>MSD: </span><span>{props.MSD}</span>
    </div>
  );
}

export default MsdDisplay;
