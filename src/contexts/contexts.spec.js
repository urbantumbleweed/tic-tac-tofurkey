import React, { useContext, Component } from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

import GameContext from './GameContext';

class Inner extends Component {
  render() {
    return (<div></div>);
  }
}

const DefaultConsumer = () => {
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
    let defaultConsumer;
    beforeEach(() => {
      defaultConsumer = mount(<DefaultConsumer />)
    })
    afterEach(() => {
      defaultConsumer.unmount();
    })
    it('`timeTravel` is `false`', () => {
      const timeTravel = defaultConsumer.find('Inner').props().timeTravel;
      expect(typeof timeTravel, '`timeTravel` is of type Boolean').to.equal('boolean')
      expect(timeTravel, '`timeTravel` defaults to false').to.be.false;
    })
    it('`moves` is `[]`', () => {
      const moves = defaultConsumer.find('Inner').props().moves;
      expect(moves instanceof Array, '`moves` is an Array').to.true
      expect(moves.length, '`moves` defaults to an empty Array').to.equal(0);
    })
    it('`goTo` is a noop function', () => {
      const goTo = defaultConsumer.find('Inner').props().goTo;
      expect(typeof goTo, '`goTo` is of type Funtion').to.equal('function')
      expect(goTo(), '`goTo` defaults to a noop function').to.be.undefined;
    })
    it('`makeMove` is a noop function', () => {
      const makeMove = defaultConsumer.find('Inner').props().makeMove;
      expect(typeof makeMove, '`makeMove` is of type Funtion').to.equal('function')
      expect(makeMove(), '`makeMove` defaults to a noop function').to.be.undefined;
    })
  })
  describe('Consumer', () => {
    it('')
  })

})