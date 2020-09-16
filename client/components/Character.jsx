import React from 'react';

function Character(props) {
  const val = (props.color === 'red' && props.value === ' ') ? '_' : props.value;
  return <span style={{ color: props.color }}>{val}</span>;
}

export default Character;
