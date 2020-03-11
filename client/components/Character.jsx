import React from 'react';

function Character(props) {
  return <span style={{ color: props.color }}>{props.value}</span>;
}

export default Character;
