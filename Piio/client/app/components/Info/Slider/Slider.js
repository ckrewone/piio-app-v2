import React, { Component } from 'react';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';
import SlideFour from './SlideFour';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import Fade from 'react-reveal/Fade';

export default class Slider extends Component {
     constructor(props) {
          super(props);

          this.state = {
               slideCount: 1
          }

          this.nextSlide = this.nextSlide.bind(this);
          this.previousSlide = this.previousSlide.bind(this);
     }

     render() {
          return (
               <div className="slider">
                         { this.state.slideCount === 1 ? <SlideOne /> : null}
                         { this.state.slideCount === 2 ? <SlideTwo /> : null}
                         { this.state.slideCount === 3 ? <SlideThree /> : null}
                         { this.state.slideCount === 4 ? <SlideFour /> : null}

                         <RightArrow nextSlide={this.nextSlide} />
                         <LeftArrow previousSlide={this.previousSlide} />
               </div>
          );
     }

     nextSlide() {
          if(this.state.slideCount < 4){
               this.setState({ slideCount: this.state.slideCount + 1 })
          } else {
               this.setState({ slideCount: 1})
          }
     }

     previousSlide() {
          if(this.state.slideCount > 1){
               this.setState({ slideCount: this.state.slideCount - 1 })
          } else {
               this.setState({ slideCount: 4})
          }
     }
}
