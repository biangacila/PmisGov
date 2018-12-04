import React, { Component } from 'react';




import Wallpaper from '../component/common/ef-wallper';
import HomeComponent from '../component/comp-home';
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps, mapStateToProps} from "../component/common/redux-dispatch-to-props";

class ConHome extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log("ALL_PROPS > ",this.props);
        return (
            <Wallpaper {...this.props} hasHeader={true} hasFooter={true} >
                <HomeComponent {...this.props}/>

            </Wallpaper>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConHome)