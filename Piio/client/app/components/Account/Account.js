import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import ReactDOM from 'react-dom'
import Zoom from 'react-reveal/Zoom';
import HeaderAccount from '../Header/HeaderAccount';
import io from 'socket.io-client';
import {
     getFromStorage,
     setInStorage,
} from '../../utils/storage';

const socket = io('http://localhost:3000');

class Account extends Component {
     constructor(props) {
          super(props);

          this.state = {
               token: '',
               first: '',
               last: '',
               messages: []
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
                         const username = this.state.first + ' ' + this.state.last;
                         socket.emit('send-nickname', username);
                    }
               });
          }
          socket.on('message', message => {
               this.setState({ messages: [message, ...this.state.messages] });
          });
     }

     componentDidUpdate(){
          var node = ReactDOM.findDOMNode(this.refs.index);
          if(node) { node.scrollIntoView(); }
     }

     handleSubmit = event => {
          const body = event.target.value
          const username = this.state.first + ' ' + this.state.last;
          if(event.keyCode === 13 && body){
               const message = {
                    body,
                    username
               }
               this.setState({ messages: [message, ...this.state.messages] });
               socket.emit('message', message);
               event.target.value = '';
          }
     }

     render(){
          var messages = this.state.messages.map((message, index) => {
               let temp = 'index';
               if(index === 0) {
                    return <div key={index} ref={temp}><b>{message.username}</b>: {message.body}</div>;
                    } else {
                         return <div key={index}><b> {message.username}</b>: {message.body}</div>;
                         }
                    });
                    messages = messages.reverse();

                    return (
                         <div>
                              <HeaderAccount />
                              {
                                   (this.state.first) ? (
                                        <Zoom>
                                             <h4>
                                                  <span>{this.state.first}</span> <span>{this.state.last}</span>
                                             </h4>
                                        </Zoom>
                                   ) : null
                              }

                              <Fade right>
                                   <div  id="chat-col">
                                        <h1>Chat: </h1>
                                        <div className="myclassname">

                                             {messages}

                                        </div>
                                        <input type='text' className="form-control" placeholder='Enter a message...' onKeyUp={this.handleSubmit}></input>
                                   </div>
                              </Fade>
                         </div>
                    );
               }
          }



          export default Account;


          //      <Fade>
          //
          //      <h4>
          //                Let's start <a className="ion-android-happy" />
          //      </h4>
          //      {
          //           (this.state.first) ? (
          //                <Zoom>
          //                     <h4>
          //                          <span>{this.state.first}</span> <span>{this.state.last}</span>
          //                     </h4>
          //                </Zoom>
          //           ) : null
          //      }
          //      <Zoom left>
          //           <p>
          //                Account page here!!!
          //           </p>
          //      </Zoom>
          //
          //      <Fade right>
          //           <div  id="chat-col">
          //                <h1>Chat: </h1>
          //                <div className="myclassname">
          //
          //                     {messages}
          //
          //                </div>
          //                <input type='text' className="form-control" placeholder='Enter a message...' onKeyUp={this.handleSubmit}></input>
          //           </div>
          //      </Fade>
          // </Fade>
