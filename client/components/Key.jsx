import React from 'react';

function Key(props) {
  const { char } = props;
  return (
    <div className='key charkey' style={{
      backgroundColor: props.colors[char].char,
      color: props.colors[char].key
    }}>{char}</div>
  );
}

export default Key;
