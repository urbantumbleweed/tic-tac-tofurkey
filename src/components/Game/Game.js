import React from 'react';
import PropTypes from 'prop-types';

import Square from '../Square';

const Game = ({ game }) => {
  if (!game) {
    return null;
  }
  return (
    <div className="gameboard">
      {
        game.map((value, index) => (
          <Square
            key={index}
            value={value}
            index={index}
          />
        ))
      }
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.array.isRequired,
}
export default Game;