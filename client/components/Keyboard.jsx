import React from 'react';
import KeyRow from './KeyRow.jsx';

function Keyboard() {
  const rows = [];
  const keys = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];
  for (let i = 0; i < 3; i++) {
    rows.push(<KeyRow row={i} keys={keys[i]} key={`keyRow_${i}`}/>);
  }
  return (
    <div id='keyboard-container'>
    <div id='keyboard'>
      {rows}
    </div>
    </div>
  );
}

export default Keyboard;
