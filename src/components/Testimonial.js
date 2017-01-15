/**
 * Created by gautam on 18/12/16.
 */
import React from 'react';

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
                    <img src = '../styles/assets/images/test1.jpg'></img>
                </div>
                <div className = 'testimonial col-xs-6'>
                    <p>Wanted to get my hair colored and called for salon at home service as getting
                        hair color at a parlor is very boring and time taking.
                        The service was excellent and my hair look awesome now.
                    </p>
                    <div className = 'name'>Kimisha</div>
                    <div className = 'details'>IT Professional, Noida</div>
                </div>
            </div>

            <div  className = 'col-xs-12'>
                <div className = 'testimonial col-xs-6'>
                    <p>I hired a professional from lookplex for full body massage as I was never comfortable
                        in getting done it in any parlor. She was very friendly and well trained.
                        Would surely recommend lookplex to everyone.
                    </p>
                    <div className = 'name'>Priyanka</div>
                    <div className = 'details'>Journalist, Delhi</div>
                </div>
                <div className = 'img col-xs-6'>
                    <img src = '../styles/assets/images/test2.jpg'></img>
                </div>
            </div>

        </div>
    )
  }
}

