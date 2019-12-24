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
  it('initializes with `state.history` that is an Array', () => {
    const history = wrapper.state().history;
    expect(history instanceof Array).to.equal(true, '`state.history` is not an Array')
  })
})