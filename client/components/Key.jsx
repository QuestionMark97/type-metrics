import React from 'react';

function Key(props) {
  const [i, j] = props.positions;
  return (
    <div className='key charkey' style={{
      backgroundColor: props.colors[i][j][0],
      color: props.colors[i][j][1]
    }}>{props.char}</div>
  );
}

export default Key;
