import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './index';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  afterEach(() => {
    wrapper.unmount();
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
})