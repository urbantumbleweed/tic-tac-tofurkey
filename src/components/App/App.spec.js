import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './index';
import { validMessages } from './App.constants';
import { promptMap } from './App.helpers';

describe('<App />', () => {
  let wrapper;
  let toggleTimeTravelSpy;
  beforeEach(() => {
    toggleTimeTravelSpy = spy(App.prototype, 'toggleTimeTravel');
    wrapper = mount(<App />);
  })
  afterEach(() => {
    wrapper.unmount();
    toggleTimeTravelSpy.restore();
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
    beforeEach(() => {
      button = wrapper.find('.time-travel');
      Game = wrapper.find('.gameboard');
      Prompt = wrapper.find('.promptContainer')
    })
    afterEach(() => {
      button = null;
      Game = null;
      Prompt = null;
    })
    it( ' displays a header', () => {
      expect(wrapper.find('.appHeader').text()).to.equal('Tic Tac Tofurkey')
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
  })
})