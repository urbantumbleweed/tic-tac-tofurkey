import React from 'react';

export const GameContext = React.createContext({
  timeTravel: false,
  goTo: () => {},
  makeMove: () => {},
});

export default GameContext;