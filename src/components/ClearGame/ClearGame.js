import React, { Component } from 'react';

class ClearGame extends Component {
  render() {
    return (
      <div role="button" onClick={this.props.onClick}>
        Clear Game
      </div>
    );
  }
}
 
export default ClearGame;