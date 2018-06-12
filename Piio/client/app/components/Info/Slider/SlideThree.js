import React, { Component } from 'react';
import chat from '../../../img/chat.jpeg';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const SlideThree= (props) => {


     let stylesImg = {
          width: '70vw',
          height: '70vh',
          borderRadius: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
          boxShadow: '0 20px 32px -8px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)'
     }

     let stylesDiv = {
          position: 'absolute',
          top: '63%',
          left: '0%',
          background: 'rgba(0,0,0,.8)',
          textAlign: 'center',
          color: '#fff',
          fontSize: '3rem',
          paddingLeft: '5vw',
          paddingRight: '5vw',
          verticalAlign: 'middle',
          lineHeight: '20vh',
          fontWeight: '300'
     }


     return <div className="slide">
          <Fade>
               <img style={stylesImg} src={chat} />
          </Fade>
          <Fade left>
               <div style={stylesDiv}>3. Find teacher :O</div>
          </Fade>
     </div>
}

export default SlideThree;
