import React from 'react';
import GameContext from '../../src/contexts/GameContext';

const Provider = ({ children, context }) => {
  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  );
}

export default Provider;