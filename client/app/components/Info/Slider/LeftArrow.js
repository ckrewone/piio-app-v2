import React, { Component } from 'react';

const LeftArrow = (props) => {
     let styles = {
          position: 'absolute',
          left: '2%',
          top: '50%',
          background: 'rgba(255,255,255,.7)',
          borderRadius: '3px',
          padding: '10px 10px 10px 10px',
     }
  return (
    <div style={styles} onClick={props.previousSlide} className='backArrow'>
      <i className='fa fa-arrow-left fa-2x' aria-hidden='true'></i>
    </div>
  );
}

export default LeftArrow;
