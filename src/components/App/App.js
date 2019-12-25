import React, { Component } from 'react';
import Game from '../Game';

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
    const suffix = this.state.timeTravel ? 'on' : 'off';
    return (
      <div>
        <button
          onClick={this.toggleTimeTravel}
          className="time-travel"
        >
          {`Time Travel: ${suffix}`}
        </button>
        <Game />
      </div> );
  }
}
 
export default App;