import React from 'react';

export default class RightColumn extends React.Component {
  render() {
    return (
      <div className='rc' style={{marginTop: this.props.top, position: this.props.position}}>
        <div className='col-md-9 fb'>
          <div id="fbwidgetencloser" className='col-md-12 pad0'>
            <iframe 
                id="showfbwidget" width="100%" height="300" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
          
          </div>
        </div>
        <div className='col-md-9 ut'>
          <div className='col-md-12 pad0'>
            <iframe className="col-xs-12 pad0 nomob"
                    width="100" height="168"
                    src="https://www.youtube.com/embed/w0C1xPhafec?rel=0&showinfo=0&autohide=1"
                    frameBorder="0">
            </iframe>
          </div>
          <div className='col-md-12 cu'> &nbsp;Priti is a big time lookplex fan!</div>
          <div className='yt col-md-12'>What do real customers have to say about Lookplex?</div>
        </div>
      </div>
    )
  }
}


