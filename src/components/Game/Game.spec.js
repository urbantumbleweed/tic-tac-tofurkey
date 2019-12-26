import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Game from './Game';
import gameCombinator from 'test/gameCombinator';

const gameCombinations = gameCombinator();

describe('<Game />', () => {
  let wrapper;
  afterEach(() => {
    wrapper = null;
  })
  describe(' `#render()', () => {
    it(' renders null if no `game` is passed', () => {
      wrapper = mount(<Game />);
      expect(wrapper.isEmptyRender()).to.be.true
    })
    it(' mounts a div that has a class `gameboard`', () => {
      const game = gameCombinations.slice(0,1);
      wrapper = mount(<Game game={gameCombinations[0]} />);
      expect(wrapper.find('.gameboard').exists()).to.be.true;
    })
  })
})