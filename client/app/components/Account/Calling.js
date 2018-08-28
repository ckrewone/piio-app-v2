import React, { Component } from 'react';
import Header from '../Header/HeaderAccount';
import Fade from 'react-reveal/Fade';
import Paint from './PaintComp';
import cam1 from '../../img/cam1.jpg';
import cam2 from '../../img/cam2.jpg';
import { Link } from 'react-router-dom';


class Calling extends Component{

     render(){
          return (
               <div className='info'>
                    <Header />

                    <Paint />
                    <Link to='/log'>
                    </Link>

                    <Fade left>
                         <h4 id='cams'>Cams:</h4>
                         <img id='cam1' src={cam1} />
                         <img id='cam2' src={cam2} />
                    </Fade>
                    <Fade>
                         <div  id='chat-col-2'>
                              <h1>Priv chat: </h1>
                              <div className='myclassname-2'>

                              </div>
                              <input type='text' className='form-control' placeholder='Enter a message...' onKeyUp={this.handleSubmit}></input>
                         </div>
                    </Fade>

               </div>
          );
     }
}

export default Calling;
