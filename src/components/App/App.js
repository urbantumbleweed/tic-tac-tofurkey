import React, { Component } from 'react';
import GameContext from 'contexts/GameContext';
import Game from '../Game';
import Prompt from '../Prompt';
import 'src/styles.scss';
import { promptMap, calculateWinner } from './App.helpers';
import TimeTravelButton from '../TimeTravelButton';
import ClearButton from '../ClearGame';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      game: Array(9).fill(null),
      moves: [],
      winner: null,
    }
    this.toggleTimeTravel = this.toggleTimeTravel.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.goTo = this.goTo.bind(this);
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
      winner: null,
    })
  }

  makeMove(i) {
    switch(true) {
      // Do nothing
      case this.state.game[i] !== null:
      case this.state.timeTravel:
      case this.state.winner !== null:
        return;
      default:
        break;
    }
    this.setState(state => {
      const newGame = state.game.slice();
      const player = state.moves.length % 2 === 0 ? 'X' : 'O';
      newGame[i] = player;
      const winner = calculateWinner(newGame);
      return {
        game: newGame,
        moves: state.moves.concat([i]),
        winner,
      };
    })
  }

  goTo(i) {
    this.setState(state => {
      const revertedMoves = state.moves.slice(0, i + 1);
      const revertedGame =  revertedMoves.reduce((newGame, square, move) => {
        newGame[square] = move % 2 === 0 ? 'X' : 'O';
        return newGame;
      }, Array(9).fill(null))
      const winner = calculateWinner(revertedGame);
      return {
        game: revertedGame,
        moves: revertedMoves,
        winner,
      }
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
            goTo: this.goTo,
            timeTravel: this.state.timeTravel,
            isTurnX,
            moves: this.state.moves,
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