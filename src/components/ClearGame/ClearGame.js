import React, { Component } from 'react';
import classnames from 'classnames';

class ClearGame extends Component {
  render() {
    return (
      <div
        role="button"
        onClick={this.props.onClick}
        className={classnames('button', 'clearButton')}
      >
        Clear Game
      </div>
    );
  }
}
 
export default ClearGame;