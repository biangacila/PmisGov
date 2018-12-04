import React, { Component } from 'react';
import Wallpaper from '../component/common/ef-wallper';
import MainComponent from '../component/comp-vehicle';
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps, mapStateToProps} from "../component/common/redux-dispatch-to-props";

class ConSettingVehicle extends Component {
    constructor(props){
        super(props)
    }
    render() {
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
)(ConSettingVehicle)