import React from 'react';
import { mount } from 'enzyme';

import Square from './Square'

describe('<Square />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Square
      key={0}
      value={'X'}
      index={0}
    />);
  })
  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  })
  it('renders a div with the class `square', () => {
    expect(wrapper.find('div').first().hasClass('square')).to.be.true;
  })
  it('one child is a div with the class `value`', () => {
    expect(wrapper.find('div.square').find('.value')).to.have.lengthOf(1);
  })
})