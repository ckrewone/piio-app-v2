import React, { Component } from 'react';
import img from '../../img/favicon.png';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import { Link } from 'react-router-dom';

class Header extends Component {
     render(){
          return (

               <nav className='navbar navbar-expand' id='global-nv'>
                    <Flip left >
                    <li className='brand'>
                         <Link to='/'><img src={img} className='App-logo'></img></Link>
                    </li>
               </Flip>
                    <Fade right >
                         <ul id='logsign' className='nav navbar-nav ml-auto'>
                              <li className='nav-item'>
                                   <Link className='nav-link' to='/log'>Zaloguj <i className='ion-android-arrow-forward' /></Link>
                              </li>
                              <li className='nav-item'>
                                   <Link className='nav-link' to='/reg'>Rejestracja<i className='ion-android-arrow-forward' /></Link>
                              </li>

                         </ul>
                    </Fade>
               </nav>

          );
     }
}

export default Header;
