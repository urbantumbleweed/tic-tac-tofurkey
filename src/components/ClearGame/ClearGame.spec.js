import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import ClearButton from '.';

describe('<ClearButton />', () => {
  it('has a class `button.clearButton`', () => {
    const wrapper = shallow(<ClearButton />);
    expect(wrapper.hasClass('button')).to.be.true;
    expect(wrapper.hasClass('clearButton')).to.be.true;
    expect(wrapper.find('.button.clearButton')).to.have.lengthOf(1);
  })
  it('has an `onClick`', () => {
    const onClick = spy();
    const wrapper = shallow(<ClearButton onClick={onClick}/>);
    expect(wrapper.getElement().props.onClick).to.exist;
    wrapper.simulate('click');
    expect(onClick.callCount).to.equal(1);
  })
})