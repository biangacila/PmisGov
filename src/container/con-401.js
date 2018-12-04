import React, { Component } from 'react';


import Wallpaper from '../component/common/ef-wallper';
import PageNotFindComponent from '../component/401';

class ConPageNotFind extends Component {
    render() {
        return (
            <Wallpaper hasHeader={true} hasFooter={false}>
                <PageNotFindComponent />

            </Wallpaper>
        );
    }
}

export default ConPageNotFind;