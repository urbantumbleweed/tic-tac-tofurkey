import React from 'react';
import classnames from 'classnames';

const TimeTravelButton = ({ onClick, isActive }) => {
  return ( 
    <div
      role="button"
      onClick={onClick}
      className={classnames('button','timeTravel', { isActive })}
    >
      {'⏱️✈️'}
    </div>
  );
}
 
export default TimeTravelButton;