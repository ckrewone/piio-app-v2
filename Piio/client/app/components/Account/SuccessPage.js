import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';


class SuccessPage extends Component {
     render(){
          return (
               <div className="info">
                    <Header />
                    <Fade>
                         <div className="row">
                              <div className="col-lg-2" />
                              <div className="col-lg-8">
                                   <h4>
                                        Success <a className="ion-android-happy" />
                              </h4>
                              <p>
                                   <Link to='/log' className="btn btn-sample btn-lg ">Log In NOW</Link>
                              </p>
                         </div>
                         <div className="col-lg-2" />
                    </div>
               </Fade>
          </div>
     );
}
}

export default SuccessPage;
