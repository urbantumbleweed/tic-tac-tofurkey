import React from 'react';
import classnames from 'classnames';

const TimeTravelButton = ({ onClick, suffix }) => {
  return ( 
    <div
      role="button"
      onClick={onClick}
      className={classnames('button','timeTravel', suffix)}
    >
      {'⏱️✈️'}
    </div>
  );
}
 
export default TimeTravelButton;