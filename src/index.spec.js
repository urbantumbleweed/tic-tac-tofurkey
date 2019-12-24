import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import App from './components/App';

describe('Entry Point:', () => {
  it(`<App /> gets mounted into '#app'`, () => {

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
    expect(document.querySelector('body').children.length).to.equal(1)
  })
})