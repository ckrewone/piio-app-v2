import React, { Component } from 'react';
import ex from '../../../img/ex.jpeg';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const SlideFour= (props) => {


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
          bottom: '13%',
          right: '0%',
          background: 'rgba(0,0,0,.8)',
          height: '20vh',
          width: '50vw',
          textAlign: 'center',
          color: '#fff',
          fontSize: '4rem',
          verticalAlign: 'middle',
          lineHeight: '20vh',
          fontWeight: '300'
     }


     return <div className="slide" style={{ overflowX : 'hidden'}}>
          <Fade >
               <img src={ex} style={stylesImg} />
          </Fade>
          <Fade right>
               <div style={stylesDiv} >Learn!!!</div>
          </Fade>
     </div>
}

export default SlideFour;
