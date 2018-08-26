import React, { Component } from 'react';
import Header from '../Header/HeaderHome';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import img from '../../img/name2.png';
import img2 from '../../img/logo.svg';

class Home extends Component {

     constructor(props){
          super(props);
     }


     render() {

          let imgStyle = {
               height: '30vw',
               marginTop: '10vh'
          }
          return (

               <div className='return-page'>
                    <Header />
                    <div id='main'>
                         <Zoom>
                              <h1>
                                   <img style={imgStyle} src={img2}></img>
                              </h1>
                              <h2>
                                   <Link
                                        className='btn btn-sample btn-lg '
                                        role='button'
                                        to='/more'>
                                        START</Link>
                              </h2>
                         </Zoom>
                    </div>
               </div>
          );
     }
}

export default Home;
