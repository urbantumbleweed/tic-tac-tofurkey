import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validOptions from 'src/constants/validOptions'
import GameContext from 'contexts/GameContext';
import Move from '../Move';

class Square extends Component {
  render() { 
    const { index, value } = this.props;
    return (
      <GameContext.Consumer>
        {({ makeMove, timeTravel}) => (
          <div className="square" onClick={() => makeMove(index)}>
            <div className="value">{value}</div>
            {timeTravel && <Move square={index} />}
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