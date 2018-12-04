import React, {Component} from 'react';

import PageHeading from './header';
import PageFooter from './footer';
import "../../asset/css/wallpaper.css"


export default class Wallpaper extends Component {

    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="wallpaper">
                {this.props.hasHeader &&(
                    <PageHeading {...this.props}/>
                )}

                    {this.props.children}

                {this.props.hasFooter &&(
                    <PageFooter {...this.props}/>
                )}
            </div>

        );
    }
}



