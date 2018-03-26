import React, { Component } from 'react';
import Header from '../Header/HeaderHome';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect
import img from '../../img/name2.png'

class Home extends Component {

     constructor(props){
          super(props);
     }

     render() {
          return (

               <div className="return-page">
                    <Header />
                         {
                              (img) ? (
                                   <div id="main">
                                        <Zoom>
                                        <h1>
                                             <img src={img}></img>
                                        </h1>
                                        <h2>
                                             <Link
                                                  className="btn btn-sample btn-lg "
                                                  role="button"
                                                  to="/more">
                                                  START</Link>
                                        </h2>
                                   </Zoom>

                                   </div>
                              ) : null
                         }
               </div>
          );
     }
}

export default Home;
