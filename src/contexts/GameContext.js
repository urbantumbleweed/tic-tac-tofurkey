import React from 'react';

export const GameContext = React.createContext({
  timeTravel: false,
  goTo: () => {},
  makeMove: () => {},
  moves: [],
});

GameContext.displayName = 'GameContext';

export default GameContext;