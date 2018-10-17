import React, {Component} from 'react';
import Header from '../Header/HeaderHome';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import img from '../../img/logo.svg';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hide: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false})
    }, 3000);
    setTimeout(() => {
      this.setState({hide: true})
    }, 2500);
  }

  render() {

    let imgStyle = {
      height: '30vw',
      marginTop: '10vh'
    }
    if (!this.state.loading) {
      return (

        <div className='return-page'>
          <Fade>
          <Header/>
          <div id='main'>
            <Zoom>
              <h1>
                <img style={imgStyle} src={img}></img>
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
          </Fade>
        </div>
      );
    } else {
      return (
        <div className={this.state.hide ? 'bubbling hidden' : 'bubbling visible'}>
          <div className="bubblingG">
	<span id="bubblingG_1">
	</span>
            <span id="bubblingG_2">
	</span>
            <span id="bubblingG_3">
	</span>
          </div>
        </div>
      );
    }
  }
}

export default Home;
