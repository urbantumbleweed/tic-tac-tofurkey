import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import TimeTravelButton from '.';

describe('<TimeTravelButton />', () => {
  it('has a class `button.timeTravel`', () => {
    const wrapper = shallow(<TimeTravelButton />);
    expect(wrapper.hasClass('button')).to.be.true;
    expect(wrapper.hasClass('timeTravel')).to.be.true;
    expect(wrapper.find('.button.timeTravel')).to.have.lengthOf(1);
  })
  it('has an `onClick`', () => {
    const onClick = spy();
    const wrapper = shallow(<TimeTravelButton onClick={onClick}/>);
    expect(wrapper.getElement().props.onClick).to.exist;
    wrapper.simulate('click');
    expect(onClick.callCount).to.equal(1);
  })
  it('has an `isActive` that controls the `isActive` class', () => {
    const onClick = spy();
    const wrapper = shallow(<TimeTravelButton onClick={onClick} isActive={true} />);
    expect(wrapper.hasClass('isActive')).to.be.true;
  })
})