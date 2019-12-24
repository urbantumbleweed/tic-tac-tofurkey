import React from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'jsdom';
import { expect } from 'chai';
import App from './components/App';

const { JSDOM } = jsdom;
const html = `
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Tic Tac Toe</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
</html>`;
const dom = new JSDOM(html);

describe('Entry Point:', () => {
  const dom = new JSDOM(html);
  it(`<App /> gets mounted into '#app'`, () => {
    const document = dom.window.document;

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
    expect(document.querySelector('body').children.length).to.equal(1)
  })
})