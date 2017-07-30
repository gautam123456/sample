import React from 'react';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import LeftNav from './common/LeftNav';

export default class GalleryHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    renderImage(imageUrl, date, caption) {
        const baseUrl = 'https://static.lookplex.com';
        return (
            <div className = 'col-xs-12 pad0'>
                <div className = 'col-xs-12 pad0 image'>
                    <img src = { baseUrl + imageUrl } />
                </div>
                { caption ? <div className = 'col-xs-12 gal-info'> caption </div> : '' }
                <div className = 'col-xs-12 gal-date pad0'> { date ? `Taken on : ${ date }`:'' } </div>
            </div>
        )
    }

    componentDidMount() {
      let self = this;
      ajaxObj.url = 'https://static.lookplex.com/data/items.json';
      ajaxObj.type = 'GET';
      ajaxObj.data = '';
      ajaxObj.xhrFields = { withCredentials: false };
      ajaxObj.success = function(data) {
        ajaxObj.xhrFields = { withCredentials: true };
        self.setState({data: data})
      }
      ajaxObj.error = function() {
        ajaxObj.xhrFields = { withCredentials: true };
        Base.sandbox.bookingDetails.name = null;
      }
      $.ajax(ajaxObj);
    }

    render() {
        const self = this,
          {data} = this.state;
      if(data !== '') {
        return (
          <div>
            <ActivityHeader heading = { 'Gallery' } fixed={true}/>
            <div className='col-md-4 nomob'>
              <LeftNav />
            </div>
            <section className = 'col-xs-12 col-md-4 pad0 gallery' style = {{ backgroundColor:'#000',color:'#fff', marginTop: 40}}>
              <div className = 'col-xs-12 gal-header'>BRIDAL</div>
              <div className = 'col-xs-12 gal-header-2'>Our work sets benchmark for industry, book and experience our new level of pampering</div>
              <div className = 'col-xs-12 gal-header-3'>Our pre-bridal packages have been crafted to give each and every bride a special feeling. To pamper you, our backstage experts bring you an exclusive range of hair and skin packages to get the perfect look for your wedding. </div>
              { data.serviceList['4'].serviceCategoryList[1].serviceItemImageSet.map(function(data){
                return <div>{ self.renderImage(data.imageUrl, data.date, data.caption) }</div>
              }) }
            </section>
          </div>
        )
      } else {
        return (
          <div></div>
        )
      }

    }
}
