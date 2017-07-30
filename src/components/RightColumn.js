import React from 'react';

export default class RightColumn extends React.Component {
  render() {
    return (
      <div className='rc'>
        <div className='col-md-8 fb pad0'>
          <div className='col-md-12 pad0'>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLookplex%2F&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="300" height="300" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
          </div>
        </div>
        <div className='col-md-8 ut'>
          <div className='col-md-12 pad0'>
            <iframe className="col-xs-12 pad0 nomob"
                    width="100" height="168"
                    src="https://www.youtube.com/embed/w0C1xPhafec?rel=0&showinfo=0&autohide=1"
                    frameBorder="0">
            </iframe>
          </div>
          <div className='col-md-12 cu'>Pretty is a big time lookplex fan!</div>
          <div className='yt col-md-12'>What do real customers have to say about Lookplex?</div>
        </div>
      </div>
    )
  }
}


