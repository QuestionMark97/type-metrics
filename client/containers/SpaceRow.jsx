import React from 'react';
import { connect } from 'react-redux';
import DummieKey from '../components/DummieKey.jsx';
import ArrowKeys from '../components/ArrowKeys.jsx';

function SpaceRow(props) {
  const firstThreeKeys = [];
  for (let i = 0; i < 3; i++) firstThreeKeys.push(<DummieKey width='35px' key={`dummie_${i}`} />);
  return (
    <div id='spacerow' className='row'>
      {firstThreeKeys}
      <DummieKey width='50px' key='dummie_3'/>
      <div id='spacebar' className='key' style={{
        backgroundColor: props.backgroundColor,
        color: props.color
      }}></div>
      <DummieKey width='50px' key='dummie_4' />
      <DummieKey width='35px' key='dummie_5' />
      <ArrowKeys />
    </div>
  );
}

function mapStateToProps({ text }) {
  return {
    backgroundColor: text.keyboard.keyColors[3][0][0],
    color: text.keyboard.keyColors[3][0][1]
  };
}

export default connect(mapStateToProps)(SpaceRow);
