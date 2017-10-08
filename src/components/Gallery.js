import React from 'react';
import ActivityHeader from './ActivityHeader';
import $ from 'jquery';
import ajaxObj from '../../data/ajax.json';
import LeftNav from './common/LeftNav';
import RightColumn from './RightColumn';
import Footer from './Footer';
import {connect} from 'react-redux';
import {getItems} from '../actions';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          screenWidth: $(window).width(),
          data: ''
        };
    }

    renderImage = (imageUrl, date, caption) => {
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

    componentDidMount = () => {
      //if(!this.props.misc.items){
      //
      //}
      //ajaxObj.url = 'https://static.lookplex.com/data/items.json';
      //ajaxObj.type = 'GET';
      //ajaxObj.data = '';
      //ajaxObj.xhrFields = { withCredentials: false };
      //ajaxObj.success = (data) => {
      //  ajaxObj.xhrFields = { withCredentials: true };
      //  this.setState({data: data})
      //}
      //ajaxObj.error = () => {
      //  ajaxObj.xhrFields = { withCredentials: true };
      //}
      //$.ajax(ajaxObj);

      window.addEventListener("resize", this.updateDimensions.bind(this));

    }

    render() {
      const {screenWidth} = this.state,
        {items} = this.props;

      if(items && items.serviceList) {
        return (
          <div>
            <ActivityHeader heading = { 'Gallery' } fixed={true}/>
            <div className='col-md-4 nomob'>
              <LeftNav screenWidth={screenWidth}/>
            </div>
            <section className = 'col-xs-12 col-md-4 pad0 gallery' style = {{ backgroundColor:'#000',color:'#fff', marginTop: 40}}>
              <div className = 'col-xs-12 gal-header'>BRIDAL</div>
              <div className = 'col-xs-12 gal-header-2'>Our work sets benchmark for industry, book and experience our new level of pampering</div>
              <div className = 'col-xs-12 gal-header-3'>Our pre-bridal packages have been crafted to give each and every bride a special feeling.
                To pamper you, our backstage experts bring you an exclusive range of hair and skin packages to get the perfect look for your wedding. </div>
              { items.serviceList['4'].serviceCategoryList[1].serviceItemImageSet.map(function(data){
                return <div>{ this.renderImage(data.imageUrl, data.date, data.caption) }</div>
              }, this) }
            </section>
            <div className='col-md-4 nomob pad0'>
              <RightColumn screenWidth={screenWidth}/>
            </div>
            <Footer />
          </div>
        )
      }else {
        return null;
      }
    }
  updateDimensions() {
    this.setState({screenWidth: $(window).width()});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
}

function mapStateToProps(state) {
  return {
    items: state.misc.items
  };
}

export default connect(mapStateToProps)(Gallery);
