/**
 * Created by gautam on 18/12/16.
 */
import React from 'react';

import testimonials from '../../data/testimonials.json';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  }

  render() {
      return (
        <div  className = 'testimonials col-xs-12 pad0'>
            <div  className = 'col-xs-12'>
                <div className = 'img col-xs-6'>
                    <img src = { testimonials[0].image }></img>
                </div>
                <div className = 'testimonial col-xs-6'>
                    <p>
                        { testimonials[0].description }
                    </p>
                    <div className = 'name'>{ testimonials[0].name }</div>
                    <div className = 'details'>{ testimonials[0].profession }</div>
                </div>
            </div>

            <div  className = 'col-xs-12'>
                <div className = 'testimonial col-xs-6'>
                    <p>
                        { testimonials[1].description }
                    </p>
                    <div className = 'name'>{ testimonials[1].name }</div>
                    <div className = 'details'>{ testimonials[1].profession }</div>
                </div>
                <div className = 'img col-xs-6'>
                    <img src = { testimonials[1].image }></img>
                </div>
            </div>

        </div>
    )
  }
}

