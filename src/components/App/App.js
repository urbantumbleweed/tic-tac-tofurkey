import React, { Component } from 'react';
import Game from '../Game';
import Prompt from '../Prompt';
import 'src/styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      game: Array(9).fill(null),
      moves: [],
      turnX: true,
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
    return (
      <div className="app">
        <h1 className="appHeader">Tic Tac Tofurkey</h1>
      <div>
        <button
          onClick={this.toggleTimeTravel}
          className="time-travel"
        >
          {`Time Travel: ${suffix}`}
        </button>
        <Game game={currentGame} />
      </div> );
  }
}
 
export default App;