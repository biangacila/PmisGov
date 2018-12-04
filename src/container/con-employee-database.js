import React, {Component} from 'react';


import Wallpaper from '../component/common/ef-wallper';
import MainComponent from '../component/employee/index';
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps, mapStateToProps} from "../component/common/redux-dispatch-to-props";

class ConEmployeeDatabase extends Component {

    render() {


        return (
            <Wallpaper {...this.props} hasHeader={true} hasFooter={true}>
                <MainComponent {...this.props}/>


            </Wallpaper>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConEmployeeDatabase)