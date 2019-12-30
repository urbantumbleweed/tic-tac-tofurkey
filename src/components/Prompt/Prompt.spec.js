import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Prompt from '.'

import { validMessages } from '../../constants/validMessages';

describe('<Prompt >', () => {
  let prompt;
  const message = validMessages[0]
  beforeEach(() => {
    prompt = shallow(<Prompt message={message} />);
  })
  afterEach(() => {
    prompt = null;
  })
  it('displays a <Prompt /> component', () => {
    expect(prompt.type()).to.equal('div')
  })
  it('passes a `message` to be rendered by Prompt', () => {
    expect(validMessages.includes(prompt.text()), 'Prompt does not have a valid message').to.be.true;
  })
})