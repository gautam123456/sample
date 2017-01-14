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
    const divStyle = { display:'block'},
          ulStyle = {
                listStyleType: 'none'
          },
          path = 'https://static.lookplex.com/testimonial/';

    return (
      <div  className='testimonial'>
        <div className='s-header'>Customer Speaks</div>
        <ul style={ulStyle}>
          {
            this.props.data.map(function(testimonial, index) {
              return <li id={index} className='hideable' style={(index == 0) ? divStyle:{}}>
                        <div className='thumbnail-sec'>
                          <img src={path + testimonial.image} />
                          <div>{ testimonial.user }</div>
                          <div>{ testimonial.description }</div>
                        </div>
                    </li>
              })}
        </ul>
      </div>
    )
  }
}

