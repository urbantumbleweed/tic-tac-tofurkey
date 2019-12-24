import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTravel: false,
      history: [Array(9).fill(null)],
    }
    this.toggleTimeTravel = this.toggleTimeTravel.bind(this);
  }

  toggleTimeTravel(e) {
    e.preventDefault();
    this.setState(state => 
      ({ timeTravel: !state.timeTravel}))
  }

  render() { 
    return (
      <div>
        <button
          onClick={this.toggleTimeTravel}
          className="time-travel"
        ></button>
      </div> );
  }
}
 
export default App;