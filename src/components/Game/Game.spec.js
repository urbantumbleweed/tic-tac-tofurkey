import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Game from './Game';

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
  })
})