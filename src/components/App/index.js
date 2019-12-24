import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      history: [Array(9).fill(null)],
    }
  }
  render() { 
    return (
      <div>
        Hello World
      </div> );
  }
}
 
export default App;