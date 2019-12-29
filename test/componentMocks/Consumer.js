import React, { Component, useContext } from 'react';
import GameContext from '../../src/contexts/GameContext';

class Inner extends Component {
  // I use React Component so faciliate the use of Enzyme Api
  render() {
    return (<div></div>);
  }
}

const Consumer = () => {
  const context = useContext(GameContext);
  return (
    <Inner {...context} />
  );
}

export default Consumer;