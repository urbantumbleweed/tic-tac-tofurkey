import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validOptions from 'src/constants/validOptions'

class Square extends Component {
  render() { 
    return (
      <div className="square">
        {this.props.value}
      </div>
    );
  }
}

Square.propTypes = {
  value: PropTypes.oneOf(validOptions)
}
export default Square;