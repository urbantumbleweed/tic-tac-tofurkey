import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validOptions from 'src/constants/validOptions'
import GameContext from 'contexts/GameContext';

class Square extends Component {
  render() { 
    return (
      <GameContext.Consumer>
        {({ makeMove, timeTravel}) => (
          <div className="square" onClick={() => makeMove(this.props.index)}>
            <span className="value">{this.props.value}</span>
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}

Square.propTypes = {
  value: PropTypes.oneOf(validOptions)
}
export default Square;