import React, { Component } from 'react';
import reg from '../../../img/reg.jpeg'

const SlideOne= (props) => {
     let background = {
          backgroundSize: 'cover',
          backgroundPosition: 'center'
     }

     return (
          <div style={background} className="slide">
               <img src={reg} />
          </div>
     );
}

export default SlideOne;
