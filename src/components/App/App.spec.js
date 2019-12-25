import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './index';

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
  it('initializes with `state.timeTravel` that is `false`', () => {
    const timeTravel = wrapper.state().timeTravel;
    expect(timeTravel).to.be.a('boolean', '`state.timeTravel` is not Boolean')
    expect(timeTravel).to.be.false;
  })
  it('initializes with `state.history` that is an Array of Arrays', () => {
    const history = wrapper.state().history;
    expect(history instanceof Array, '`state.history` is not an Array').to.true
    expect(history.length, '`state.history` should initialize with one inner Array').to.equal(1);
    const initialGameState = history[0];
    expect(initialGameState instanceof Array, '`state.history[0] ` is not an Array').to.be.true;
    expect(initialGameState.length).to.equal(9, '`state.history[0]` must have a length of 9');
    expect(initialGameState, '`state.history[0]` should initialize with null values').to.deep.equal(Array(9).fill(null))
  })
  describe('#render ', () => {
    let button;
    let Game;
    let Prompt
    beforeEach(() => {
      button = wrapper.find('.time-travel');
      Game = wrapper.find('.gameboard');
      Prompt = wrapper.find('.prompt')
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
    it(' displays a <Prompt />', () => {
      expect(Prompt.type()).to.equal('div')
    })
  })
})