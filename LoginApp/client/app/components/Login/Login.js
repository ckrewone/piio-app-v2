
import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import img from '../../img/favicon.png'
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

import Account from '../Account/Account'
import {
     getFromStorage,
     setInStorage,
} from '../../utils/storage';

class Login extends Component {
     constructor(props) {
          super(props);

          this.state = {
               token: '',
               signInError: '',
               signInEmail: '',
               signInPassword: ''
          };


          this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
          this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
          this.onSignIn = this.onSignIn.bind(this);

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
                              token
                         });
                    }
               });
          }
     }

     onTextboxChangeSignInEmail(event) {
          this.setState({
               signInEmail: event.target.value,
          });
     }

     onTextboxChangeSignInPassword(event) {
          this.setState({
               signInPassword: event.target.value,
          });
     }


     onSignIn(){
          const {
               signInEmail,
               signInPassword,
               signInError
          } = this.state;

          this.setState({
               isLoading: true,
          });

          fetch('/api/account/signin', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword
               }),
          })
          .then( res => res.json())
          .then( json => {
               if(json.success){
                    setInStorage('the_main_app', { token: json.token});
                    this.setState({
                         signInError: json.message,
                         isLoading: false,
                         token: json.token,
                         name: json.first,
                         last: json.last
                    });
               } else{
                    this.setState({
                         signInError: json.message,
                         isLoading: false
                    });
               }
          });

     }




     render() {
          const {
               token,
               signInEmail,
               signInPassword,
               signInError
          } = this.state;

          if(!token){
               return (

                    <div className="return-page">
                         <Header />
                         <Fade cascade>
                              <div className="container">
                                   <div className="row">
                                        <div className="col-lg-12"
                                             id="log-box">
                                             <div
                                                  className="form-group">
                                                  <p>
                                                       Sign in:
                                                  </p>

                                                  {
                                                       (signInError) ? (
                                                            <Fade>
                                                                 <div
                                                                      className="alert alert-danger">
                                                                      {signInError}
                                                                 </div>
                                                            </Fade>
                                                       ) : null
                                                  }
                                                  <h3>E-mail:</h3>
                                                  <input
                                                       type="email"
                                                       placeholder="Enter your E-mail"
                                                       defaultValue={signInEmail}
                                                       className="form-control"
                                                       onChange={this.onTextboxChangeSignInEmail} />
                                                  <br />
                                                  <h3>Password:</h3>
                                                  <input
                                                       type="password"
                                                       placeholder="Enter your Password"
                                                       defaultValue={signInPassword}
                                                       className="form-control"
                                                       onChange={this.onTextboxChangeSignInPassword} />
                                                  <br />
                                                  <button
                                                       onClick={this.onSignIn}
                                                       className="btn btn-sample btn-lg login-button">
                                                       Sign In
                                                  </button>
                                                  <br />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </Fade>
                    </div>
               );
          }

          return (
               <div>
                    <Account />
               </div>
          );
     }
}

export default Login;
