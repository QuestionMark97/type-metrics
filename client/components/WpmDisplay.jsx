import React from 'react';

function WpmDisplay(props) {
  return (
    <div id='wpm-display'>
      <span>WPM: </span>
      <span>{props.WPM}</span>
    </div>
  );
}

export default WpmDisplay;
