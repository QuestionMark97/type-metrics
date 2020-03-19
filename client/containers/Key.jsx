import React from 'react';
import { connect } from 'react-redux';

function Key(props) {
  const [i, j] = props.positions;
  return (
    <div className='key' style={{
      backgroundColor: props.colors[i][j][0],
      color: props.colors[i][j][1]
    }}>{props.char}</div>
  );
}

function mapStateToProps(state) {
  return {
    colors: state.keyboard.color
  };
}

export default connect(mapStateToProps)(Key);
