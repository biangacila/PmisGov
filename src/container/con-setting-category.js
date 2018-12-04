import React, { Component } from 'react';
import Wallpaper from '../component/common/ef-wallper';
import MainComponent from '../component/comp-setting-category';
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps, mapStateToProps} from "../component/common/redux-dispatch-to-props";

class ConSettingCategory extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log("ALL_PROPS > ",this.props);
        return (
            <Wallpaper {...this.props} hasHeader={true} hasFooter={true} >
                <MainComponent {...this.props}/>

            </Wallpaper>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConSettingCategory)