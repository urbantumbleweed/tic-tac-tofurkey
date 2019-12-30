import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validOptions from 'src/constants/validOptions'
import GameContext from 'contexts/GameContext';
import { emojify } from 'helpers';
import Move from '../Move';

function Square ({ index, value }) {
  const { makeMove, timeTravel, isTurnX, winner, moves } = useContext(GameContext);
  return (
    <div
      className={classnames(
        'square',
        (isTurnX ? 'isTurnX' : 'isTurnO'), 
        {
          xValue: value === 'X',
          oValue: value === 'O',
          gameover: winner || moves.length === 9,
        }
      )}
      onClick={() => makeMove(index)}
    >
      <div className="value">{emojify(value)}</div>
      {timeTravel && <Move square={index} />}
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.oneOf(validOptions)
}
export default Square;