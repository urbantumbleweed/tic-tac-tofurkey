import React from 'react';
import 'src/styles.scss';

const Prompt = ({ message }) => {
  return (
    <div className="promptContainer">
      {message}
    </div>
  );
}
 
export default Prompt;