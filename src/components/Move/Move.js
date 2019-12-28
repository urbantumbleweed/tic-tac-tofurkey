import React, { useContext } from 'react';
import GameContext from 'contexts/GameContext';
import classnames from 'classnames';

const Move = ({ square }) => {
  const { timeTravel, goTo, moves} = useContext(GameContext);
  const pastMove = moves.indexOf(square);
  if (timeTravel && pastMove !== -1) {
    return (
      <div
        className={
          classnames('gotoButton', (pastMove % 2 === 0 ? 'x' : 'o'))}
        onClick={() => goTo(pastMove)}
      >
        {pastMove + 1}
      </div>
    ); 
  }
  return <div></div>
}
 
export default Move;
