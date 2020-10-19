import React from 'react';

function Key(props) {
  const { char } = props;
  return (
    <div className='key charkey' style={{
      backgroundColor: props.color.char,
      color: props.color.key
    }}>{char}</div>
  );
}

export default Key;
