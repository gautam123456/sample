import React from 'react';

export default class RightColumn extends React.Component {
  render() {
    return (
      <div className='rc' style={{marginTop: this.props.top, position: this.props.position}}>
        <div className='col-md-9 fb'>
          <div className='col-md-12 pad0'>
           <div class="fb-page" data-href="https://www.facebook.com/Lookplex/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/Lookplex/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Lookplex/">Lookplex</a></blockquote></div>
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


