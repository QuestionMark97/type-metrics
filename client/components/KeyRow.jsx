import React from 'react';
import KeyContainer from '../containers/KeyContainer.jsx';
import DummieKey from './DummieKey.jsx';

function KeyRow(props) {
  const keys = [];

  if (props.row === 0) keys.push(<DummieKey width='41px' key='dummie_0' />);
  if (props.row === 1) keys.push(<DummieKey width='56px' key='dummie_0' />);
  if (props.row === 2) keys.push(<DummieKey width='81px' key='dummie_0' />);

  for (let i = 0; i < props.keys.length; i++) {
    keys.push(<KeyContainer positions={[props.row, i]} char={props.keys[i]} key={`char_${i}`} />);
  }

  if (props.row === 0) for (let i = 0; i < 2; i++) keys.push(<DummieKey width='40px' key={`dummie_${i + 1}`} />);
  if (props.row === 1) {
    keys.push(<DummieKey width='40px' key='dummie_1' />);
    keys.push(<DummieKey width='71px' key='dummie_2' />);
  }
  if (props.row === 2) {
    for (let i = 0; i < 2; i++) keys.push(<DummieKey width='40px' key={`dummie_${i + 1}`} />);
    keys.push(<DummieKey width='92px' key='dummie_3'/>);
  }

  return (
    <div className='row'>{keys}</div>
  );
}

export default KeyRow;
