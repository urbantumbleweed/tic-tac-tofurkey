import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { mock } from 'sinon';
import Game from './Game';
import gameCombinator from 'test/gameCombinator';

const gameCombinations = gameCombinator();

describe('<Game />', () => {
  let wrapper;
  let mockConsole;
  let game;
  beforeEach(() => {
    mockConsole = mock(console);
    game = gameCombinations[0].slice();
  })
  afterEach(() => {
    wrapper = null;
    mockConsole.restore();
    mockConsole = null;
  })
  describe(' `#render()', () => {
    it(' renders null if no `game` is passed', () => {
      const propError = mockConsole.expects("error");
      if (process.env.MOCHA_WATCH) {
        propError.atMost(1);
      } else {
        propError.once(1);
      }
      wrapper = mount(<Game />);
      expect(wrapper.isEmptyRender()).to.be.true;
      expect(propError.verify()).to.be.true
    })
    it(' mounts a div that has a class `gameboard`', () => {
      const game = gameCombinations.slice(0,1);
      wrapper = mount(<Game game={gameCombinations[0]} />);
      expect(wrapper.find('.gameboard').exists()).to.be.true;
    })
    it(' renders 9 <Square /> for all 6046 valid game combinations', function () {
      this.slow(10000)
      this.timeout(10000)
      gameCombinations.forEach((game) => {
        wrapper = shallow(<Game game={game} />);
        const gameboard = wrapper.find('.gameboard');
        expect(gameboard.children().length).to.equal(9)
        const children = gameboard.find('Square');
        expect(children.length, 'children of `Game` should all be of type <Square>').to.equal(9)
        wrapper.unmount();
      })
    })
    it('displays a <Game /> component', () => {
      wrapper = shallow(<Game game={game} />);
      expect(wrapper.type(), '<Game /> is a div').to.equal('div')
    })
    it('passes a `game` array to the Game and renders 9 children', () => {
      wrapper = shallow(<Game game={game} />);
      const gameProps = wrapper.props();
      expect(gameProps.children.length, 'Game has 9 children').to.equal(9)
    })
  })
})