import React from 'react';

function DummieKey(props) {
  return (
    <div className='key' style={{ width: props.width, height: props.height || '40px' }}></div>
  );
}

export default DummieKey;
