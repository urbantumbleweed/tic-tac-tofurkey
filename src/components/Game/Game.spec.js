import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Game from './Game';
import gameCombinator from 'test/gameCombinator';
import Square from '../Square';

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
    it(' renders 9 <Square /> for all 6046 valid game combinations', (done) => {
      gameCombinations.forEach((game, gameIndex) => {
        wrapper = shallow(<Game game={game} />);
        const gameboard = wrapper.find('.gameboard');
        expect(gameboard.children().length).to.equal(9)
        const children = gameboard.find('Square');
        expect(children.length, 'children of `Game` should all be of type <Square>').to.equal(9)
        wrapper.unmount();
      })
      done();
    })
  })
})