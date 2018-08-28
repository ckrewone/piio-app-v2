import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import Fade from 'react-reveal/Fade';
import Account from '../Account/Account';
import SuccessPage from '../Account/SuccessPage';
import { Link } from 'react-router-dom';
import {
     getFromStorage,
     setInStorage,
} from '../../utils/storage';

class Register extends Component {
     constructor(props) {
          super(props);

          this.state = {
               token: '',
               signUpError:'',
               signUpEmail: '',
               signUpPassword: '',
               signUpFirstName: '',
               signUpLastName: '',
               success: false,
          };

          this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
          this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
          this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
          this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
          this.onSignUp = this.onSignUp.bind(this);
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
                         });
                    }
               });
          }
     }

     onTextboxChangeSignUpEmail(event) {
          this.setState({
               signUpEmail: event.target.value,
          });
     }
     onTextboxChangeSignUpPassword(event) {
          this.setState({
               signUpPassword: event.target.value,
          });
     }
     onTextboxChangeSignUpFirstName(event) {
          this.setState({
               signUpFirstName: event.target.value,
          });
     }
     onTextboxChangeSignUpLastName(event) {
          this.setState({
               signUpLastName: event.target.value,
          });
     }

     onSignUp(){
          const {
               signUpEmail,
               signUpLastName,
               signUpPassword,
               signUpFirstName
          } = this.state;

          fetch('/api/account/signup', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    firstName: signUpFirstName,
                    lastName: signUpLastName,
                    email: signUpEmail,
                    password: signUpPassword
               }),
          })
          .then( res => res.json())
          .then( json => {
               if(json.success){
                    this.setState({
                         signUpError: json.message,
                         success: json.success
                    });
               } else{
                    this.setState({
                         signUpError: json.message
                    });
               }
          });

     }



     render() {
          const {
               token,
               signUpLastName,
               signUpFirstName,
               signUpPassword,
               signUpEmail,
               signUpError,
               success
          } = this.state;


          if(!token){

               if(success){
                    return (
                         <SuccessPage />
                    );
               } else {
                    return (

                         <div className='return-page'>
                              <Header />
                              <Fade>
                                   <div className='container'>
                                        <div className='row'>
                                             <div className='col-sm-4'></div>
                                             <div className='col-sm-4'
                                                  id='log-box'>
                                                  <div
                                                       className='form-group'>
                                                       <p>
                                                            Sign up:
                                                       </p>
                                                       {
                                                            (signUpError) ? (
                                                                 <Fade>
                                                                      <div
                                                                           className='alert alert-danger'>
                                                                           {signUpError}
                                                                      </div>
                                                                 </Fade>
                                                            ) : null
                                                       }
                                                       <h3>First Name:</h3>
                                                       <input
                                                            type='text'
                                                            placeholder='Enter your First Name'
                                                            defaultValue={signUpFirstName}
                                                            className='form-control'
                                                            onChange={this.onTextboxChangeSignUpFirstName} />
                                                       <br />
                                                       <h3>Last Name:</h3>
                                                       <input
                                                            type='text'
                                                            placeholder='Enter your Last Name'
                                                            defaultValue={signUpLastName}
                                                            className='form-control'
                                                            onChange={this.onTextboxChangeSignUpLastName} />
                                                       <br />
                                                       <h3>E-mail:</h3>
                                                       <input
                                                            type='email'
                                                            placeholder='Enter your E-mail'
                                                            defaultValue={signUpEmail}
                                                            className='form-control'
                                                            onChange={this.onTextboxChangeSignUpEmail} />
                                                       <br />
                                                       <h3>Password:</h3>
                                                       <input
                                                            type='password'
                                                            placeholder='Enter your Password'
                                                            defaultValue={signUpPassword}
                                                            className='form-control'
                                                            onChange={ this.onTextboxChangeSignUpPassword} />
                                                       <br />
                                                       <button
                                                            onClick={this.onSignUp}
                                                            className='btn btn-sample btn-lg login-button'>
                                                            Sign Up
                                                       </button>
                                                       <br />
                                                  </div>
                                             </div>
                                        </div>
                                        <br/>
                                   </div>
                              </Fade>
                         </div>

                    );
               }

          }

          return (
               <div>
                    <Account />
               </div>
          );


     }
}
export default Register;
