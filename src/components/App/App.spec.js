import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import App from './index';
import { validMessages } from './App.constants';
import { promptMap } from './App.helpers';
import gameCombinator from 'test/gameCombinator';

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
  beforeEach(() => {
    toggleTimeTravelSpy = spy(App.prototype, 'toggleTimeTravel');
    clearGameSpy = spy(App.prototype, 'clearGame');
    wrapper = mount(<App />);
  })
  afterEach(() => {
    wrapper.unmount();
    toggleTimeTravelSpy.restore();
    clearGameSpy.restore();
  })
  describe(' helpers', () => {
    it(' `#promptMap()` is a function that returns strings', () => {
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
  })
  describe(' state', () => {
    it(' initializes with `state.timeTravel` that is `false`', () => {
      const timeTravel = wrapper.state().timeTravel;
      expect(timeTravel).to.be.a('boolean', '`state.timeTravel` is not Boolean')
      expect(timeTravel).to.be.false;
    })
    it(' initializes with `state.moves` that is an Array', () => {
      const moves = wrapper.state().moves;
      expect(moves instanceof Array, '`state.moves` is not an Array').to.true
      expect(moves.length, '`state.moves` should initialize with no moves').to.equal(0);
    })
    it(' initializes with `state.game` that is an Array', () => {
      const game = wrapper.state().game;
      expect(game instanceof Array, '`state.game` is not an Array').to.true;
      expect(game.length, '`state.game` must initialize with a length of 9').to.equal(9);
      expect(game, '`state.game` should initialize with null values').to.deep.equal(Array(9).fill(null));
    })
  })
  describe('#render ', () => {
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
    it( ' displays a header', () => {
      expect(wrapper.find('.appHeader').text()).to.equal('Tic Tac Tofurkey')
    })
    it(' displays an actions container where TimeTravel button lives', () => {
      expect(wrapper.find('.actions').children.length).to.be.equal(1);
    })
    it(' `Time Travel` button that when clicked toggles `timeTravel`', () => {
      const expectedValues = [true, false, true, false];
      expectedValues.forEach((expectedValue, index) => {
        button.simulate('click');
        expect(
          wrapper.state().timeTravel,
          `'state.timeTravel' should have toggled to ${expectedValue} after ${index + 1} 'click${index === 0 ? '' : 's'}'`)
          .to.equal(expectedValue);
        expect(App.prototype.toggleTimeTravel).to.have.property('callCount', index + 1);
      })
      expect(App.prototype.toggleTimeTravel).to.have.property('callCount', expectedValues.length)
    })
    it(' `Time Travel` button is denoted as `on` or `off`', () => {
      expect(button.text()).to.contain('Time Travel:');
      const expectedValues = ['off', 'on', 'off', 'on'];
      expectedValues.forEach((suffix, i) => {
        expect(button.text()).to.contain(suffix);
        button.simulate('click');
        expect(App.prototype.toggleTimeTravel).to.have.property('callCount', i + 1);
      })
      expect(App.prototype.toggleTimeTravel).to.have.property('callCount', expectedValues.length)
    })
    it(' displays a <Game /> component', () => {
      expect(Game.type(), '<Game /> is a div').to.equal('div')
    })
    it(' passes a `game` array to the Game and renders 9 children', () => {
      const gameProps = Game.props();
      expect(gameProps.children.length, 'Game has 9 children').to.equal(9)
    })
    it(' displays a <Prompt /> component', () => {
      expect(Prompt.type()).to.equal('div')
    })
    it(' passes a `message` to be rendered by Prompt', () => {
      expect(validMessages.includes(Prompt.text()), 'Prompt does not have a valid message').to.be.true;
    })
    it(' `Clear Game` component that when clicked, reinitializes `game` and `moves`', () => {
      const existingGame = gameCombinations[800].slice();
      const existingMoves = existingGame.reduce((acc, move, i) => {
        if (move) {
          acc.push(i);
        }
        return acc;
      }, [])
      wrapper.setState({
        game: existingGame,
        moves: existingMoves
      })
      expect(wrapper.state().game, `pre-state of 'game' should be ${existingGame.toString()}`).to.deep.equal(existingGame)
      expect(wrapper.state().moves, `pre-state of 'moves' should be ${existingMoves.toString()}`).to.deep.equal(existingMoves)
      ClearButton.simulate('click');
      const { game, moves } = wrapper.state();
      expect(game, '`state.game` should reinitialize to Array of `null`s').to.deep.equal(Array(9).fill(null));
      expect(moves, '`state.moves` should reinitialize to an empty Array').to.deep.equal([]);
      expect(App.prototype.clearGame).to.have.property('callCount', 1)
    })
    it('`Clear Game` clears the `state.winner` if one is defined', () => {
      let existingGame = someCompleteGames[0].slice();
      const existingMoves = existingGame.reduce((acc, move, i) => {
        if (move) {
          acc.push(i);
        }
        return acc;
      }, [])
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
  })
})