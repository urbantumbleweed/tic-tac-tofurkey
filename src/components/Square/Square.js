import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import validOptions from 'src/constants/validOptions'
import GameContext from 'contexts/GameContext';
import Move from '../Move';

function Square ({ index, value }) {
  const { makeMove, timeTravel} = useContext(GameContext);
  return (
    <div className="square" onClick={() => makeMove(index)}>
      <div className="value">{value}</div>
      {timeTravel && <Move square={index} />}
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.oneOf(validOptions)
}
export default Square;