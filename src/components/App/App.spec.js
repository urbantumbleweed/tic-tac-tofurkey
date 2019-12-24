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
  it('has state with `timeTravel` that is a `Boolean`', () => {
    expect(wrapper.state().timeTravel).to.equal(false);
  })
})