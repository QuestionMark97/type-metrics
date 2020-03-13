import React from 'react';
import Key from './Key.jsx';

function KeyRow(props) {
  const keys = [];
  for (let i = 0; i < props.keys.length; i++) {
    keys.push(<Key char={props.keys[i]} key={`char_${i}`} />);
  }
  return (
    <div className='row' id={`row_${props.row}`}>{keys}</div>
  );
}

export default KeyRow;
