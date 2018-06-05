import React, { Component } from 'react';

const RightArrow = (props) => {
     let styles = {
          position: 'absolute',
          right: '2%',
          top: '50%',
          background: 'rgba(255,255,255,.7)',
          borderRadius: '3px',
          padding: '10px 10px 10px 10px',
     }

  return (
    <div style={styles} onClick={props.nextSlide} className="nextArrow">
      <i  className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
    </div>
  );
}

export default RightArrow;
