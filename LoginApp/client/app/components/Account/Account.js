import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import HeaderAccount from '../Header/HeaderAccount';
import {
     getFromStorage,
     setInStorage,
} from '../../utils/storage';

class Account extends Component {
     constructor(props) {
          super(props);

          this.state = {
               token: '',
               first: '',
               last: ''
          }
     }



     componentDidMount(){
          const obj = getFromStorage('the_main_app');
          if (obj && obj.token) {
               const { token } = obj;
               //verify
               fetch('api/account/verify?token=' + token)
               .then( res => res.json())
               .then( json => {
                    if(json.success){
                         this.setState({
                              token,
                              first: json.first,
                              last: json. last
                         });
                    } else {
                         this.setState({
                         });

                    }
               });
          } else {
               this.setState({
               });
          }
     }

     render(){

          return (
               <div>
                    <HeaderAccount />
                    <div className="info">
                         <Fade>
                              <div className="row">
                                   <div className="col-lg-2" />
                                   <div className="col-lg-8">
                                        <img
                                             width="170px"
                                             height="140px" />
                                        <Zoom>
                                             <h4>
                                                  Let's start dude <a className="ion-android-happy" />
                                        </h4>
                                   </Zoom>
                                   {
                                        (this.state.first) ? (
                                             <Zoom>
                                                  <h4>
                                                       <span>{this.state.first}</span> <span>{this.state.last}</span>
                                                  </h4>
                                             </Zoom>
                                        ) : null
                                   }
                                   <Flip left>
                                        <p>
                                             Account page here!!!
                                        </p>
                                   </Flip>
                              </div>
                              <div className="col-lg-2" />
                         </div>
                    </Fade>
               </div>
          </div>
     );
}



}


export default Account;
