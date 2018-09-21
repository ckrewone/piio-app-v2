import React from 'react';
import reg from '../../../img/reg.jpg';
import Fade from 'react-reveal/Fade';

const SlideOne = (props) => {


  let stylesImg = {
    width: '50vw',
    borderRadius: '10px',
    marginTop: '12vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    boxShadow: '0 20px 32px -8px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)'
  }

  let stylesDiv = {
    position: 'absolute',
    bottom: '2vw',
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


  return (
    <div className='slide'>
      <Fade>
        <img src={reg} style={stylesImg}/>
      </Fade>
      <Fade left>
        <div style={stylesDiv}>1. Załóż konto</div>
      </Fade>
    </div>
  );
}

export default SlideOne;
