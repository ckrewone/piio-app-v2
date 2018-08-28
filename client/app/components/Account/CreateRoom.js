import React from 'react';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default class CreateRoom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      room: '',
      roomPath: ''
    };
  }

  handleChange = event => {
    let path = `room/${event.target.value}`;
    this.setState(
      {
        room: event.target.value,
        roomPath: path
      });
  };


  render() {

    return (
      <div>
        <div className='row'>
          <div className='col-md-3'></div>
          <Fade bottom>
            <div className='col-md-6' id='create-room'>
              <h2>Create or Join room</h2>
              <input className='form-control' type='text' placeholder='Enter room name'
                     onChange={this.handleChange}/>
              <Link
                to={{
                  pathname: this.state.roomPath,
                  state: this.props
                }}
                className={this.state.room ? 'btn btn-sample' : 'btn btn-sample disabled'}>
                Join!
              </Link>
            </div>
          </Fade>
          <div className='col-md-3'></div>
        </div>
      </div>
    );

  }
}
