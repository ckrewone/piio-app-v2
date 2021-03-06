import React, {Component} from 'react';
import {SketchPad, TOOL_ELLIPSE, TOOL_ERASE, TOOL_LINE, TOOL_PENCIL, TOOL_RECTANGLE} from './paint';
import Fade from 'react-reveal/Fade';
import {pencil} from 'react-icons-kit/fa/pencil'
import {ic_crop_din} from 'react-icons-kit/md/ic_crop_din'
import {circleO} from 'react-icons-kit/fa/circleO'
import {fileO} from 'react-icons-kit/fa/fileO'
import {longArrowRight} from 'react-icons-kit/fa/longArrowRight'
import {Icon} from 'react-icons-kit'

import io from 'socket.io-client';

const wsClient = io('http://localhost:3000');


export default class SketchExample extends Component {


  constructor(props) {
    super(props);

    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  componentDidMount() {
    wsClient.emit('join', this.props.room);
    wsClient.on('addItem', item => {
      this.setState({items: this.state.items.concat([item])})
    });
  }

  render() {
    const {tool, size, color, fill, fillColor, items} = this.state;
    return (
      <div style={{textAlign: "center"}}>
        <div className='row'>
          <div className='col-md-1'>
            <Fade left>
              <div className='tool-box'>
                <div className='tools' style={{textAlign: 'center'}}>
                  <div className='icon-box'
                       style={tool == TOOL_PENCIL ? {
                         transform: "scale(-1, 1)",
                         color: '#C96218',
                         margin: "auto"
                       } : {
                         color: '#fff',
                         margin: "auto"
                       }}>
                    <Icon size={32} icon={pencil} onClick={() => this.setState({tool: TOOL_PENCIL})}/></div>
                  <div
                    className='icon-box'
                    style={tool == TOOL_ELLIPSE ? {
                      transform: "scale(-1, 1)",
                      color: '#C96218',
                      margin: "auto"
                    } : {color: '#fff', margin: "auto"}}>
                    <Icon size={32} icon={circleO} onClick={() => this.setState({tool: TOOL_ELLIPSE})}/></div>
                  <div
                    className='icon-box' style={tool == TOOL_RECTANGLE ? {
                    transform: "scale(-1, 1)",
                    color: '#C96218',
                    margin: "auto"
                  } : {
                    color: '#fff',
                    margin: "auto"
                  }}>
                    <Icon size={32} icon={ic_crop_din} onClick={() => this.setState({tool: TOOL_RECTANGLE})}/></div>
                  <div className='icon-box' style={tool == TOOL_LINE ? {
                    transform: "scale(-1, 1)",
                    color: '#C96218',
                    margin: "auto"
                  } : {color: '#fff', margin: "auto"}}>
                    <Icon size={32} icon={longArrowRight}
                          onClick={() => this.setState({tool: TOOL_LINE})}/></div>
                  <div
                    className='icon-box' style={tool == TOOL_ERASE ? {
                    transform: "scale(-1, 1)",
                    color: '#C96218',
                    margin: "auto"
                  } : {
                    color: '#fff',
                    margin: "auto"
                  }}>
                    <Icon size={32} icon={fileO} onClick={() => this.setState({tool: TOOL_ERASE})}/></div>
                  <div className='options'>
                    <label htmlFor='' style={{fontSize: "15"}}>ROZMIAR</label><br/>
                    <input id='size-range' orient="vertical" className='input-range' min='1' max='20' type='range'
                           value={size}
                           onChange={(e) => this.setState({size: parseInt(e.target.value)})}/>
                  </div>
                  <div className='options'>
                    <label htmlFor='' style={{fontSize: "15"}}>KOLOR</label>
                    <input type='color' value={color} onChange={(e) => this.setState({color: e.target.value})}/>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <div className='col-md-10'>
            <div className='canvas'>
              <Fade>
                <SketchPad
                  animate={true}
                  size={size}
                  color={color}
                  fillColor={fill ? fillColor : ''}
                  items={items}
                  tool={tool}
                  onCompleteItem={(i) => wsClient.emit('addItem', Object.assign(i, this.props))}
                />
              </Fade>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    );
  }
}
