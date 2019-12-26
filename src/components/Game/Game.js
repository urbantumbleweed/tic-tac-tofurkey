import React from 'react';
import PropTypes from 'prop-types';

const Game = ({ game }) => {
  if (!game) {
    return null;
  }
  return (
    <div className="gameboard">
      {
        game.map((value, index) => (
          <div key={index}>{value}</div>
        ))
      }
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.array.isRequired,
}
export default Game;