import React, { useContext, Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import GameContext from './GameContext';

const Provider = ({ children, context }) => {
  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  );
}

class Inner extends Component {
  render() {
    return (<div></div>);
  }
}

const Consumer = () => {
  const context = useContext(GameContext);
  return (
    <Inner {...context} />
  );
}

describe('GameContext', () => {
  it('`displayName` that is `GameContext', () => {
    expect(GameContext.displayName).to.equal('GameContext');
  })
  describe('Default values ', () => {
    let consumer;
    beforeEach(() => {
      consumer = mount(<Consumer />)
    })
    afterEach(() => {
      consumer.unmount();
    })
    it('`timeTravel` is `false`', () => {
      const timeTravel = consumer.find('Inner').props().timeTravel;
      expect(typeof timeTravel, '`timeTravel` is of type Boolean').to.equal('boolean')
      expect(timeTravel, '`timeTravel` defaults to false').to.be.false;
    })
    it('`moves` is `[]`', () => {
      const moves = consumer.find('Inner').props().moves;
      expect(moves instanceof Array, '`moves` is an Array').to.true
      expect(moves.length, '`moves` defaults to an empty Array').to.equal(0);
    })
    it('`goTo` is a noop function', () => {
      const goTo = consumer.find('Inner').props().goTo;
      expect(typeof goTo, '`goTo` is of type Funtion').to.equal('function')
      expect(goTo(), '`goTo` defaults to a noop function').to.be.undefined;
    })
    it('`makeMove` is a noop function', () => {
      const makeMove = consumer.find('Inner').props().makeMove;
      expect(typeof makeMove, '`makeMove` is of type Funtion').to.equal('function')
      expect(makeMove(), '`makeMove` defaults to a noop function').to.be.undefined;
    })
  })
  describe('Passes values to consumers', () => {
    let wrapper;
    const context = {
      timeTravel: true,
      moves:[4],
      goTo: (arg) => arg,
      makeMove: (arg) => arg,
    }
    beforeEach(() => {
      wrapper = mount(
        <Provider context={context}>
          <Consumer />
        </Provider >
      );
    })
    afterEach(() => {
      wrapper.unmount();
    })
    it('timeTravel', () => {
      const timeTravel = wrapper.find('Inner').props().timeTravel;
      expect(typeof timeTravel, '`timeTravel` is of type Boolean').to.equal('boolean')
      expect(timeTravel, '`timeTravel` is passed from Provider').to.be.true;
    })
    it('moves', () => {
      const moves = wrapper.find('Inner').props().moves;
      expect(moves instanceof Array, '`moves` is an Array').to.true
      expect(moves, '`moves` matches what was passed by Provider').to.deep.equal(context.moves.slice());
    })
    it('goTo', () => {
      const goTo = wrapper.find('Inner').props().goTo;
      const arg = 'ugabuga';
      expect(typeof goTo, '`goTo` is of type Funtion').to.equal('function')
      expect(goTo(arg), '`goTo` is the same function passed in Provider').to.equal(context.goTo(arg));
    })
    it('makeMove', () => {
      const makeMove = wrapper.find('Inner').props().makeMove;
      const arg = 'ugabuga';
      expect(typeof makeMove, '`makeMove` is of type Funtion').to.equal('function')
      expect(makeMove(arg), '`makeMove` is the same function passed in Provider').to.equal(context.makeMove(arg));
    })
  })
})