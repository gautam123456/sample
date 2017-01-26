/**
 * Created by gautam on 19/12/16.
 */
import React from 'react';
import {Link} from 'react-router';
import ActivityHeader from './ActivityHeader';

import data from '../../data/items.json';

export default class GalleryHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data.serviceList['1']
        };
    }

    renderBridalGallery() {
        return (
            <button className = 'gallery-btn col-xs-12'><Link to = "/gallery/bridal">Bridal Gallery</Link></button>
        )
    }

    render() {
        return (
            <div>
                <ActivityHeader heading = { 'Gallery' }/>
                <section className = 'col-md-offset-4 col-xs-12 col-md-4 home-gallery'>
                    { data.serviceList['6'].serviceCategoryList[0].serviceItemImageSet.length > 0 ? this.renderBridalGallery() : 'jojo' }
                </section>
            </div>
        )
    }
}


