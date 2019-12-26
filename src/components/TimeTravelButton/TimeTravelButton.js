import React from 'react';

const TimeTravelButton = ({ onClick, suffix }) => {
  return ( 
    <button
      onClick={onClick}
      className="time-travel"
    >
      {`Time Travel: ${suffix}`}
    </button>
  );
}
 
export default TimeTravelButton;