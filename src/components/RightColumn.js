import React from 'react';

export default class RightColumn extends React.Component {
  render() {
    if (this.props.screenWidth > 991) {
      const width = Math.round(window.screen.availWidth * 21/100),
        src = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLookplex%2F&tabs=timeline&width=${width}&height=500&small_header=false&adapt_container_width=true&hide_cta=true&hide_cover=false&show_facepile=true&appId`;
      return (
        <div className='rc' style={{marginTop: this.props.top, position: this.props.position, width: width+12}}>
          <div className='col-md-12 fb' style = {{width: width+12}}>
            <div className='col-md-12 pad0'>
              <iframe src={src}
                      width={width} height="300"
                      style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
            </div>
          </div>
          <div className='col-md-12 ut' style = {{width: width+12}}>
            <div className='col-md-12 pad0'>
              <iframe className="col-xs-12 pad0 nomob"
                      width={width} height="168"
                      src="https://www.youtube.com/embed/w0C1xPhafec?rel=0&showinfo=0&autohide=1"
                      frameBorder="0">
              </iframe>
            </div>
            <div className='col-md-12 cu'> &nbsp;Priti is a big time lookplex fan!</div>
            <div className='yt col-md-12'>What do real customers have to say about Lookplex?</div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}


