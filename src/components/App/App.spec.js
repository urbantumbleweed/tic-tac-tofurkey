import React from 'react';
import sampleSize from 'lodash/sampleSize';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { wins } from 'test/fixtures';

import App from './index';
import { validMessages } from './App.constants';
import { promptMap, calculateWinner } from 'helpers';
import gameCombinator, { gameTypes } from 'test/gameCombinator';

const gameCombinations = gameCombinator();
const someCompleteGames = [];
for (let i = 0; i < gameCombinations.length; i++) {
  if (!gameCombinations[i].includes(null)) {
    someCompleteGames.push(gameCombinations[i].slice())
    if (someCompleteGames.length > 4) {
      break;
    } 
  }
}

describe('<App />', () => {
  let wrapper;
  let toggleTimeTravelSpy;
  let clearGameSpy;
  let makeMoveSpy;
  let goToSpy;
  beforeEach(() => {
    toggleTimeTravelSpy = spy(App.prototype, 'toggleTimeTravel');
    clearGameSpy = spy(App.prototype, 'clearGame');
    makeMoveSpy = spy(App.prototype, 'makeMove');
    goToSpy = spy(App.prototype, 'goTo');
    wrapper = mount(<App />);
  })
  afterEach(() => {
    wrapper.unmount();
    toggleTimeTravelSpy.restore();
    clearGameSpy.restore();
    makeMoveSpy.restore();
    goToSpy.restore();
  })
  describe('helpers', () => {
    describe('#promptMap()', () => {
      it('is a function that returns strings', () => {
        expect(typeof promptMap).to.equal('function')
        expect(promptMap(), 'should return an empty string if called with no args').to.equal('');
        for (let move = 0; move < 9; move++) {
          if (move % 2 === 0) {
            expect(
              promptMap(move),
              `If it is X's turn, the message should be '${validMessages[0]}'`
              ).to.equal(validMessages[0])
          } else {
            expect(
              promptMap(move),
              `If it is O's turn, the message should be '${validMessages[1]}'`
              ).to.equal(validMessages[1])
          }
        }
        expect(
          promptMap(null, 'X'),
          `If 'X' wins, the message should be '${validMessages[2]}'`
          ).to.equal(validMessages[2])
        expect(
          promptMap(null, 'O'),
          `If 'O' wins, the message should be '${validMessages[3]}'`
          ).to.equal(validMessages[3])
      })
      it('favors the presence of a `winner` parameter', () => {
        expect(
          promptMap(4, 'X'),
          `If a winner X is passed, the message should be '${validMessages[2]}'`
          ).to.equal(validMessages[2])
        expect(
          promptMap(5, 'O'),
          `If a winner O is passed, the message should be  '${validMessages[3]}'`
          ).to.equal(validMessages[3])
      })
      it('produces a tie message there is no winner', () => {
        expect(
          promptMap(9, undefined),
          `If game is tie, then message should be '${validMessages[4]}'`
          ).to.equal(validMessages[4])
      })
    })
    describe('#calculateWinner()', () => {
      it('detects a top-row X winner', () => {
        const [ game, nextMove, moves] = wins.topRowX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a top-row O winner', () => {
        const [ game, nextMove, moves] = wins.topRowO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a middle-row winner', () => {
        const [ game, nextMove, moves] = wins.midRowX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a mid-row O winner', () => {
        const [ game, nextMove, moves] = wins.midRowO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a bottom-row X winner', () => {
        const [ game, nextMove, moves] = wins.botRowX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a bottom-row O winner', () => {
        const [ game, nextMove, moves] = wins.botRowO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a left-col X winner', () => {
        const [ game, nextMove, moves] = wins.leftColX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a left-col O winner', () => {
        const [ game, nextMove, moves] = wins.leftColO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a middle-col X winner', () => {
        const [ game, nextMove, moves] = wins.midColX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a middle-col O winner', () => {
        const [ game, nextMove, moves] = wins.midColO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a right-col X winner', () => {
        const [ game, nextMove, moves] = wins.rightColX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a right-col O winner', () => {
        const [ game, nextMove, moves] = wins.rightColO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a diag-down O winner', () => {
        const [ game, nextMove, moves] = wins.diagDownO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a diag-down X winner', () => {
        const [ game, nextMove, moves] = wins.diagDownX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a diag-up X winner', () => {
        const [ game, nextMove, moves] = wins.diagUpX;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'X')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('X');
      })
      it('detects a diag-up O winner', () => {
        const [ game, nextMove, moves] = wins.diagUpO;
        wrapper.setState({
          game,
          moves,
        })
        expect(wrapper.state().game).to.deep.equal(game);
        expect(wrapper.state().moves).to.deep.equal(moves);
        wrapper.find('.square').at(nextMove).simulate('click');
        // since game is a reference to old state, we can mutate it to include the value added on click
        game.splice(nextMove, 1, 'O')
        expect(wrapper.state().game, '`state.game` after click should include new move').to.deep.equal(game);
        expect(wrapper.state().moves, 'the length of moves should increase after click').to.deep.equal(moves.concat([nextMove]));
        expect(wrapper.state().winner, '`state.winner` should indicate the winner').to.deep.equal('O');
      })
      it('detects a sparse board winner', () => {
        sampleSize(gameTypes.sparseX, 10).forEach(game => {
          expect(calculateWinner(game)).to.equal('X')
        })
        sampleSize(gameTypes.sparseO, 10).forEach(game => {
          expect(calculateWinner(game)).to.equal('O')
        })
      })
      it('detects a full board winner', () => {
        sampleSize(gameTypes.completeX, 10).forEach(game => {
          expect(calculateWinner(game)).to.equal('X')
        })
        sampleSize(gameTypes.completeO, 10).forEach(game => {
          expect(calculateWinner(game)).to.equal('O')
        })
      })
      it('detects a full board tie', () => {
        sampleSize(gameTypes.completeTie, 10).forEach(game => {
          expect(calculateWinner(game)).to.be.null
        })
      })
      it('detects a sparse board tie', () => {
        sampleSize(gameTypes.sparseTie, 10).forEach(game => {
          expect(calculateWinner(game)).to.be.null
        })
      })
    })
  })
  describe('state', () => {
    describe('initializes', () => {
      it('`timeTravel` as `false`', () => {
        const timeTravel = wrapper.state().timeTravel;
        expect(timeTravel).to.be.a('boolean', '`state.timeTravel` is not Boolean')
        expect(timeTravel).to.be.false;
      })
      it('`moves` as an empty Array', () => {
        const moves = wrapper.state().moves;
        expect(moves instanceof Array, '`state.moves` is not an Array').to.true
        expect(moves.length, '`state.moves` should initialize with no moves').to.equal(0);
      })
      it('`game` as a games-sized Array of nulls', () => {
        const game = wrapper.state().game;
        expect(game instanceof Array, '`state.game` is not an Array').to.true;
        expect(game.length, '`state.game` must initialize with a length of 9').to.equal(9);
        expect(game, '`state.game` should initialize with null values').to.deep.equal(Array(9).fill(null));
      })
    })
  })
  describe('render', () => {
    let button;
    let Game;
    let Prompt
    let ClearButton;
    beforeEach(() => {
      button = wrapper.find('.time-travel');
      Game = wrapper.find('.gameboard');
      Prompt = wrapper.find('.promptContainer');
      ClearButton = wrapper.find('ClearGame');
    })
    afterEach(() => {
      button = null;
      Game = null;
      Prompt = null;
      ClearButton = null;
    })
    it('<header> with fun title', () => {
      expect(wrapper.find('.appHeader').text()).to.equal('Tic Tac Tofurkey')
    })
    it('actions container with `Time Travel` and `Clear Game` options', () => {
      expect(wrapper.find('.actions').children().length).to.be.equal(2);
    })
    it('`Time Travel` button is denoted as `on` or `off`', () => {
      expect(button.text()).to.contain('Time Travel:');
      const expectedValues = ['off', 'on', 'off', 'on'];
      expectedValues.forEach((suffix, i) => {
        expect(button.text()).to.contain(suffix);
        button.simulate('click');
        expect(App.prototype.toggleTimeTravel).to.have.property('callCount', i + 1);
      })
      expect(App.prototype.toggleTimeTravel).to.have.property('callCount', expectedValues.length)
    })
    it('displays a <Game /> component', () => {
      expect(Game.type(), '<Game /> is a div').to.equal('div')
    })
    it('passes a `game` array to the Game and renders 9 children', () => {
      const gameProps = Game.props();
      expect(gameProps.children.length, 'Game has 9 children').to.equal(9)
    })
    it('displays a <Prompt /> component', () => {
      expect(Prompt.type()).to.equal('div')
    })
    it('passes a `message` to be rendered by Prompt', () => {
      expect(validMessages.includes(Prompt.text()), 'Prompt does not have a valid message').to.be.true;
    })
    it('includes <Move /> components in its childNodes if `timeTravel` is enabled', () => {
      const [game, insert, moves] = wins.topRowX;
      const newGame = game.slice();
      newGame[insert] = null;
      wrapper.setState({
        timeTravel: true,
        game: newGame,
        moves,
      });
      let moveComponent = wrapper.find('.gotoButton');
      expect(moveComponent).to.have.lengthOf(moves.length)
    })
  })
  describe('handlers', () => {
    describe('#makeMove()', () => {
      it('updates `game` and `moves` if valid', () => {
        const squares = wrapper.find('.square');
        squares.forEach((_, index) => {
          squares.at(index).simulate('click');
          expect(App.prototype.makeMove, 'makeMove should be called when a Square is clicked').to.have.property('callCount', index + 1)
          const { game, moves } = wrapper.state();
          const player = index % 2 === 0 ? 'X' : 'O';
          expect(game[index], `'state.game[${index}]' should be updated with player`).to.equal(player);
          expect(moves[index], `'state.moves[${index}]' should be updated with square index`).to.equal(index);
          wrapper.setState({ game: Array(9).fill(null) })
        })
      })
      it('does nothing if clicked Square has value', () => {
        const squares = wrapper.find('.square');
        const index = 0;
        // initial valid click
        squares.first().simulate('click');
        expect(App.prototype.makeMove, 'First click should only count once').to.have.property('callCount', 1);
        expect(wrapper.state().game[index], `'state.game[${index}]' should be updated with player`).to.equal('X');
        expect(wrapper.state().moves[index], `'state.moves[${index}]' should be updated with square index`).to.equal(index);
        expect(wrapper.state().moves.length, `'state.moves' should have a single item`).to.equal(1);
        // second click on already clicked Square
        squares.first().simulate('click');
        expect(App.prototype.makeMove, 'Second click should call the function again').to.have.property('callCount', 2)
        expect(wrapper.state().game[index], `'state.game[${index}]' should not change once set`).to.equal('X');
        expect(wrapper.state().moves[index], `'state.moves[${index}]' should not change once set`).to.equal(index);
        expect(wrapper.state().moves.length, `'state.moves' should have a single item`).to.equal(1);
      })
      it('does nothing if `state.timeTravel` is true', () => {
        const squares = wrapper.find('.square');
        const index = 0;
        wrapper.setState({
          timeTravel: true,
        })
        squares.first().simulate('click');
        expect(App.prototype.makeMove, 'Click should be counted').to.have.property('callCount', 1);
        expect(wrapper.state().game[index], `'state.game[${index}]' should not change when in 'timeTravel'`).to.equal(null);
        expect(wrapper.state().moves[index], `'state.moves[${index}]' should remain undefined`).to.be.undefined;
        expect(wrapper.state().moves.length, `'state.moves' should be not have added a value`).to.equal(0);
      })
      it('does nothing if `state.winner` is defined', () => {
        const squares = wrapper.find('.square');
        const index = 0;
        wrapper.setState({
          winner: 'X'
        })
        squares.first().simulate('click');
        expect(App.prototype.makeMove, 'Click should be counted').to.have.property('callCount', 1);
        expect(wrapper.state().game[index], `'state.game[${index}]' should not update when there is a winner`).to.equal(null);
        expect(wrapper.state().moves[index], `'state.moves[${index}]' should remain undefined`).to.be.undefined;
        expect(wrapper.state().moves.length, `'state.moves' should be not have added a value`).to.equal(0);
      })
    })
    describe('#goTo()', () => {
      let game;
      beforeEach(() => {
        game = Array(9).fill(null);
      })
      afterEach(() => {
        game = null;
      })
      it('called when <Move /> is clicked with `pastMove` index of the square', () => {
        const moveIndex = 3;
        game[moveIndex] = 'X';
        wrapper.setState({
          timeTravel: true,
          game,
          moves: [moveIndex],
        })
        const goToButton = wrapper.find('.gotoButton');
        goToButton.first().simulate('click');
        expect(App.prototype.goTo, 'First click should only count once').to.have.property('callCount', 1);
      })
      it('is called with a pastMove identifier to revert state', () => {
        const game = Array(9).fill(null);
        let playedSquare = 3;
        game[playedSquare] = 'X';
        let moves = [playedSquare];
        // set state for the first move
        wrapper.setState({
          timeTravel: true,
          game,
          moves: moves.slice(),
        })
        let goToButton = wrapper.find('.gotoButton');
        goToButton.first().simulate('click');
        let wentTo = wrapper.state().moves.indexOf(playedSquare);
        expect(App.prototype.goTo.lastCall.args[0], '`goTo` should be called with the `pastMove` index').to.equal(wentTo);

        // play next move
        playedSquare += 3;
        game[playedSquare] = 'O';
        moves.push(playedSquare);
        // increment state
        wrapper.setState({
          timeTravel: true,
          game,
          moves: moves.slice(),
        })
        goToButton = wrapper.find('.gotoButton');
        goToButton.at(1).simulate('click');
        wentTo = wrapper.state().moves.indexOf(playedSquare);
        expect(App.prototype.goTo.lastCall.args[0], '`goTo` should be called with the next `pastMove` index').to.equal(wentTo);
      })
      it('reverts `moves` when called', () => {
        const moveIndex = 3;
        const moveIndex2 = 6;
        game[moveIndex] = 'X';
        game[moveIndex] = 'O';
        wrapper.setState({
          timeTravel: true,
          game,
          moves: [moveIndex, moveIndex2],
        })
        const goToButton = wrapper.find('.gotoButton');
        goToButton.at(0).simulate('click');
        expect(wrapper.state().moves, 'should revert to the first play').to.deep.equal([moveIndex]);
      })
      it('reverts `game` when called', () => {
        const moveIndex = 3;
        const moveIndex2 = 6;
        game[moveIndex] = 'X';
        game[moveIndex2] = 'O';
        wrapper.setState({
          timeTravel: true,
          game: game.slice(),
          moves: [moveIndex, moveIndex2],
        })
        const goToButton = wrapper.find('.gotoButton');
        goToButton.at(0).simulate('click');
        game = Array(9).fill(null);
        game[moveIndex] = 'X';
        expect(wrapper.state().game, 'should still have the earlier plays').to.deep.equal(game);
      })
      it('it recalculates `winner` when called', () => {
        const [completedGame, nextMove, moves] = wins.topRowX;
        wrapper.setState({
          timeTravel: true,
          game: game.slice(),
          moves: moves.concat([nextMove]),
          winner: calculateWinner(completedGame)
        })
        expect(wrapper.state().winner, '`winner` should be defined before test').to.equal('X');
        const goToButton = wrapper.find('.gotoButton');
        goToButton.at(0).simulate('click');
        expect(wrapper.state().winner, '`winner` should be recalculated').to.be.null;
      })
      it('toggles off `timeTravel`', () => {
        const moveIndex = 3;
        const moveIndex2 = 6;
        game[moveIndex] = 'X';
        game[moveIndex] = 'O';
        wrapper.setState({
          timeTravel: true,
          game,
          moves: [moveIndex, moveIndex2],
        })
        expect(wrapper.state().timeTravel, '`timeTravel` should be enabled before test').to.be.true;
        const goToButton = wrapper.find('.gotoButton');
        goToButton.at(0).simulate('click');
        expect(wrapper.state().winner, '`timeTravel` should be turned off').to.be.null;
      })
    })
    describe('#toggleTimeTravel()', () => {
      it('toggles `state.timeTravel', () => {
        const timeTravelButton = wrapper.find('.time-travel');
        const expectedValues = [true, false, true, false];
        expectedValues.forEach((expectedValue, index) => {
          timeTravelButton.simulate('click');
          expect(
            wrapper.state().timeTravel,
            `'state.timeTravel' should have toggled to ${expectedValue} after ${index + 1} 'click${index === 0 ? '' : 's'}'`)
            .to.equal(expectedValue);
          expect(App.prototype.toggleTimeTravel).to.have.property('callCount', index + 1);
        })
        expect(App.prototype.toggleTimeTravel).to.have.property('callCount', expectedValues.length)
      })
    })
    describe('#clearGame()', () => {
      let existingGame;
      let existingMoves;
      let ClearButton;
      beforeEach(() => {
        ClearButton = wrapper.find('ClearGame');
        existingGame = someCompleteGames[0].slice();
        existingMoves = existingGame.reduce((acc, move, i) => {
          if (move) {
            acc.push(i);
          }
          return acc;
        }, [])
      })
      afterEach(() => {
        ClearButton = null;
        existingGame = null;
        existingMoves = null;
      })
      it('nullifies `state.winner`', () => {
        wrapper.setState({
          winner: 'X',
          game: existingGame,
          moves: existingMoves,
        })
        expect(wrapper.state().winner, `pre-state of 'winner' `).to.equal('X');
        expect(wrapper.state().moves, `pre-state of 'moves' should be ${existingMoves.toString()}`).to.deep.equal(existingMoves)
        expect(wrapper.state().winner, `pre-state of 'winner' should be 'X'`).to.equal('X')
        ClearButton.simulate('click');
        const { game, moves, winner } = wrapper.state();
        expect(game, '`state.game` should reinitialize to Array of `null`s').to.deep.equal(Array(9).fill(null));
        expect(moves, '`state.moves` should reinitialize to an empty Array').to.deep.equal([]);
        expect(winner, '`state.winner` should reinitialize to `null`').to.be.null;
        expect(App.prototype.clearGame).to.have.property('callCount', 1)
      })
      it('resets `state.game`', () => {
        wrapper.setState({
          game: existingGame,
          moves: existingMoves
        })
        expect(wrapper.state().game, `pre-state of 'game' should be ${existingGame.toString()}`).to.deep.equal(existingGame)
        ClearButton.simulate('click');
        expect(wrapper.state().game, '`state.game` should reinitialize to Array of `null`s').to.deep.equal(Array(9).fill(null));
        expect(App.prototype.clearGame).to.have.property('callCount', 1)
      })
      it('resets `state.moves`', () => {
        wrapper.setState({
          game: existingGame,
          moves: existingMoves
        })
        expect(wrapper.state().moves, `pre-state of 'moves' should be ${existingMoves.toString()}`).to.deep.equal(existingMoves)
        ClearButton.simulate('click');
        expect(wrapper.state().moves, '`state.moves` should reinitialize to an empty Array').to.deep.equal([]);
        expect(App.prototype.clearGame).to.have.property('callCount', 1)
      })
    })
  })
})