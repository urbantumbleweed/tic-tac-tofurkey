import React from 'react';

const Game = ({ game }) => {
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

export default Game;