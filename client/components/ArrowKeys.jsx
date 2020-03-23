import React from 'react';
import DummieKey from './DummieKey.jsx';

function ArrowKeys() {
  const keys = [];
  for (let i = 0; i < 3; i++) keys.push(<DummieKey width='25px' height='17px' key={`dummie_${i}`}/>);
  return (
    <div id='arrowkeys'>
      <div id='arrowrow1' className='row'>
        <DummieKey width='25px' height='17px' key='dummie_3'/>
      </div>
      <div className='row'>{keys}</div>
    </div>
  );
}

export default ArrowKeys;
