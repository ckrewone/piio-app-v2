import React, {Component} from 'react';
import img from '../../img/favicon.png';

import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand' id='global-nv'>
        <li className='brand'>
          <Link to='/'><img src={img} className='App-logo'></img></Link>
        </li>
        <ul id='logsign' className='nav navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/log'>Zaloguj <i className='ion-android-arrow-forward'/></Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/reg'>Rejestracja <i className='ion-android-arrow-forward'/></Link>
          </li>
        </ul>
      </nav>

    );
  }
}

export default Header;
