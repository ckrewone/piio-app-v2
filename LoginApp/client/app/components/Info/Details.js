import React, { Component } from 'react';
import Header from '../Header/Header';
import Fade from 'react-reveal/Fade';

class Details extends Component{

     render(){
          return (
               <div className="info">
                    <Header />
                    <Fade>
                    <div className="row">
                         <div className="col-lg-2" />
                         <div className="col-lg-8">
                              <img
                                   width="170px"
                                   height="140px" />
                              <h4>
                                   Let's start <a className="ion-android-happy" />
                         </h4>
                         <p>
                              This is place for instruction
                         </p>
                    </div>
                    <div className="col-lg-2" />
               </div>
          </Fade>
          </div>
     );
}
}

export default Details;
