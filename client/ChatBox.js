import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';
import ReactDOM from 'react-dom'

const socket = this.props.socket;

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const username = this.props.first + ' ' + this.props.last;
    socket.emit('send-nickname', username);

    socket.on('message', message => {
      this.setState({messages: [message, ...this.state.messages]});
    });
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.index);
    if (node) {
      node.scrollIntoView();
    }
  }

  handleSubmit = event => {
    const body = event.target.value;
    const username = this.props.first + ' ' + this.props.last;
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        username,
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

    return (
      <div>
        <Fade bottom>
          <div>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6' id='chat-col'>
                <h1>Chat: </h1>
                <div className='myclassname'>
                  {messages}
                </div>
                <input type='text' className='form-control' placeholder='Enter a message...'
                       onKeyUp={this.handleSubmit}></input>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default ChatBox;
