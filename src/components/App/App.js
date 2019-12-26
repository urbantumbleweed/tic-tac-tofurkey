import React, { Component } from 'react';
import GameContext from 'contexts/GameContext';
import Game from '../Game';
import Prompt from '../Prompt';
import 'src/styles.scss';
import { promptMap } from './App.helpers';
import TimeTravelButton from '../TimeTravelButton';
import ClearButton from '../ClearGame';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      game: Array(9).fill(null),
      moves: [],
    }
    this.toggleTimeTravel = this.toggleTimeTravel.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  toggleTimeTravel(e) {
    e.preventDefault();
    this.setState(state => 
      ({ timeTravel: !state.timeTravel}))
  }

  clearGame(e) {
    e.preventDefault(e);
    this.setState({
      game: Array(9).fill(null),
      moves: [],
    })
  }

  makeMove(i) {
    this.setState(state => {
      const newGame = state.game.slice();
      const player = state.moves.length % 2 === 0 ? 'X' : 'O';
      newGame[i] = player;
      return {
        game: newGame,
        moves: state.moves.concat([i]),
      };
    })
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
        <GameContext.Provider
          value={{
            makeMove: this.makeMove,
            goTo: (move) => console.log(move),
            timeTravel: this.state.timeTravel,
            isTurnX,
          }}>
          <Game game={this.state.game} />
        </GameContext.Provider>
        <div className="actions">
          <TimeTravelButton onClick={this.toggleTimeTravel} suffix={suffix} />
          <ClearButton onClick={this.clearGame}/>
        </div>
      </div> );
  }
}
 
export default App;