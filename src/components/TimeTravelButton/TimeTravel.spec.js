import React from 'react';
import { shallow } from 'enzyme';
import TimeTravelButton from '.';

describe('<TimeTravelButton />', () => {
  it('has a class `button.timeTravel`', () => {
    const wrapper = shallow(<TimeTravelButton />);
    expect(wrapper.hasClass('button')).to.be.true;
    expect(wrapper.hasClass('timeTravel')).to.be.true;
    expect(wrapper.find('.button.timeTravel')).to.have.lengthOf(1);
  })
})