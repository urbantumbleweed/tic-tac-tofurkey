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
    expect(wrapper.find('div').hasClass('square')).to.be.true;
  })
})