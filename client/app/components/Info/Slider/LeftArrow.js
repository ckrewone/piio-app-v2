import React, { Component } from 'react';

const LeftArrow = (props) => {

  return (
    <div onClick={props.previousSlide} className='prev-arrow'>
      <i className='fa fa-arrow-left fa-2x' aria-hidden='true'></i>
    </div>
  );
}

export default LeftArrow;
