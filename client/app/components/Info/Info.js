import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

class Info extends Component{

     render(){
          return (
               <div className="info">
                    <Header />
                    <Fade>
                         <div className="row">
                              <div className="col-lg-2" />
                              <div className="col-lg-8">
                                   <h4>
                                        Let's start <a className="ion-android-happy" />
                              </h4>
                              <p>
                                   Hi! I am Piio! I will help you in learning. When translating sentences from mathematics e.g. it is important to explain the examples, but translating formulas and tasks remotely is a big problem. I solve this problem. Yes :D I combined video chat with an interactive place to draw. Live! From now learning using the internet becomes easy.
                              </p>
                              <p>
                                   <Link
                                        className="btn btn-sample"
                                        role="button"
                                        to="/moremore">
                                        View details »
                                   </Link>

                                   <Link
                                        className="btn btn-sample"
                                        role="button"
                                        to="/log">
                                        Sign in <i className="ion-android-add" />
                              </Link>
                         </p>
                    </div>
                    <div className="col-lg-2" />
               </div>
          </Fade>
     </div>
);
}
}

export default Info;
