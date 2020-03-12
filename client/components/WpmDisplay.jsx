import React from 'react';

function WpmDisplay(props) {
  return (
    <div>
      <span>WPM: </span>
      <span>{props.WPM}</span>
    </div>
  );
}

export default WpmDisplay;
