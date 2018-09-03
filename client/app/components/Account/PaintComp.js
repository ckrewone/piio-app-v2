import React, { Component } from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from './paint';
import Fade from 'react-reveal/Fade';
import io from 'socket.io-client';

const wsClient = io('http://localhost:3000');


export default class SketchExample extends Component
{
     socket = null;


     constructor(props) {
          super(props);

          this.state = {
               tool:TOOL_PENCIL,
               size: 2,
               color: '#000000',
               fill: false,
               fillColor: '#444444',
               items: []
          }
     }

  componentDidMount() {
    wsClient.on('addItem', item => {
      this.setState({items: this.state.items.concat([item])})
    });
  }

     render() {
          const { tool, size, color, fill, fillColor, items } = this.state;
          return (
               <div>
                    <div className='canvas'>
                         <Fade right>
                              <SketchPad
                                   animate={true}
                                   size={size}
                                   color={color}
                                   fillColor={fill ? fillColor : ''}
                                   items={items}
                                   tool={tool}
                                   onCompleteItem={(i) => wsClient.emit('addItem',i)}
                                   />
                         </Fade>
                    </div>
                    <Fade left>
                         <div className='tool-box'>
                              <div className='tools' style={{marginBottom:20}}>
                                   <button
                                        style={tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
                                        className={tool == TOOL_PENCIL  ? ' btn btn-sm item-active' : ' btn btn-sm item'}
                                        onClick={() => this.setState({tool:TOOL_PENCIL})}
                                        >Pencil</button>

                                   <button
                                        style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
                                        className={tool == TOOL_LINE  ? 'btn btn-sm item-active' : 'btn btn-sm item'}
                                        onClick={() => this.setState({tool:TOOL_LINE})}
                                        >Line</button>
                                   <br />
                                   <button
                                        style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
                                        className={tool == TOOL_ELLIPSE  ? 'btn btn-sm item-active' : 'btn btn-sm item'}
                                        onClick={() => this.setState({tool:TOOL_ELLIPSE})}
                                        >Ellipse</button>
                                   <button
                                        style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
                                        className={tool == TOOL_RECTANGLE  ? 'btn btn-sm item-active' : 'btn btn-sm item'}
                                        onClick={() => this.setState({tool:TOOL_RECTANGLE})}
                                        >Rectangle</button>
                              </div>
                              <div className='options' style={{marginBottom:20}}>
                                   <label htmlFor=''>size: </label><br />
                                   <input className='input-range' min='1' max='20' type='range' value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
                              </div>
                              <div className='options' style={{marginBottom:20}}>
                                   <label htmlFor=''>color: </label>
                                   <input type='color' value={color} onChange={(e) => this.setState({color: e.target.value})} />
                              </div>
                              {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
                                   <div>
                                        <label htmlFor=''>fill in: </label>
                                        <input type='checkbox' value={fill} style={{margin:'0 8'}}
                                             onChange={(e) => this.setState({fill: e.target.checked})} />
                                        {fill ? <span>
                                             <label htmlFor=''>with color:</label>
                                             <input type='color' value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                                        </span> : ''}
                                   </div> : ''}
                              </div>
                         </Fade>
                    </div>
               );
          }
     }
