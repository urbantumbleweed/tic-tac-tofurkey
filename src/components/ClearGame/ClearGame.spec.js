import React from 'react';
import { shallow } from 'enzyme';
import ClearButton from '.';

describe('<ClearButton />', () => {
  it('has a class `button.clearButton`', () => {
    const wrapper = shallow(<ClearButton />);
    expect(wrapper.find('.button.clearButton')).to.have.lengthOf(1);
  })
})