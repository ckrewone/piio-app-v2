import React, {Component} from 'react';
import Header from '../Header/Header';
import Fade from 'react-reveal/Fade';
import io from 'socket.io-client';
import log from '../../img/log.jpeg';
import reg from '../../img/reg.jpeg';
import ex from '../../img/ex.jpeg';
import Sliders from './Slider/Slider'

class Details extends Component {

  render() {
    let stylesDiv = {
      background: 'rgba(0,0,0,.6)',
      height: '88vh',
      paddingTop: '30px'

    }

    return (


      <div>
        <Header/>
        <div style={stylesDiv}>
          <Sliders/>
        </div>
      </div>
    );
  }
}

export default Details;
