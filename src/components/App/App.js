import React, { Component } from 'react';
import Game from '../Game';
import Prompt from '../Prompt';
import 'src/styles.scss';
import { promptMap } from './App.helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      game: Array(9).fill(null),
      moves: [],
    }
    this.toggleTimeTravel = this.toggleTimeTravel.bind(this);
  }

  toggleTimeTravel(e) {
    e.preventDefault();
    this.setState(state => 
      ({ timeTravel: !state.timeTravel}))
  }

  render() {
    const suffix = this.state.timeTravel ? 'on' : 'off';
    const currentMove = this.state.moves.length;
    const isTurnX = currentMove % 2 === 0;
    const winner = this.state.winner;
    return (
      <div className="app">
        <h1 className="appHeader">Tic Tac Tofurkey</h1>
        <Prompt message={promptMap(currentMove, winner)} />
        <Game game={this.state.game} />
        <button
          onClick={this.toggleTimeTravel}
          className="time-travel"
        >
          {`Time Travel: ${suffix}`}
        </button>
      </div> );
  }
}
 
export default App;