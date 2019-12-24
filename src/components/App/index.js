import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      history: [],
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