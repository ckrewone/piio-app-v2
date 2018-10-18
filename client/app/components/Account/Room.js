import React from 'react';
import {Link} from "react-router-dom";
import io from 'socket.io-client';
import HeaderRoom from '../Header/HeaderRoom';
import Paint from './PaintComp';
import Fade from "react-reveal/Fade";
import ReactDOM from "react-dom";
import {getFromStorage} from "../../utils/storage";


const socket = io('http://80.211.180.21:3001');

export default class Room extends React.Component {
  constructor(props) {
    super();
    this.state = {
      room: '',
      isLimit: true,
      messages: []
    };
  }


  componentWillMount() {
    socket.emit('join', this.props.match.params.id);
  }

  componentDidMount() {
    const username = this.props.location.state.first + ' ' + this.props.location.state.last;
    socket.emit('send-nickname', username);
    socket.on('message', message => {
      this.setState({messages: [message, ...this.state.messages]});
    });
  }

  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this.refs.index);
    if (node) {
      node.scrollIntoView();
    }
  }

  handleSubmit = event => {
    const body = event.target.value;
    const username = this.props.location.state.first + ' ' + this.props.location.state.last;
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        username,
        room: this.props.match.params.id
      };
      this.setState({messages: [message, ...this.state.messages]});
      socket.emit('message', message);
      event.target.value = '';
    }
  };

  render() {
    let messages = this.state.messages.map((message, index) => {
      let temp = 'index';
      if (index === 0) {
        return <div key={index} ref={temp}><b>{message.username}</b>: {message.body}</div>;
      } else {
        return <div key={index}><b> {message.username}</b>: {message.body}</div>;
      }
    });
    messages = messages.reverse();


    return (<div>
      <HeaderRoom/>
      <Paint
        room={this.props.match.params.id}
      />
      <Fade>
        <div className="row">
          <div className='col-md-1'></div>
          <div className='col-md-10' id='chat-col-2'>
          <h1>Czat pokoju: </h1>
          <div className='myclassname-2'>
            {messages}
          </div>
          <input type='text' className='form-control' placeholder='Napisz wiadomość..'
                 onKeyUp={this.handleSubmit}></input>
          </div>
        </div>
      </Fade>

    </div>);
  }
}
