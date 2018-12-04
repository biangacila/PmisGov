
import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { mapStateToProps, mapDispatchToProps} from '../component/common/redux-dispatch-to-props';


import Wallpaper from '../component/common/ef-wallper';
import LoginComponent from '../component/comp-login';

class ConLogin extends Component {
    render() {
        return (
            <Wallpaper hasHeader={false} hasFooter={false} {...this.props}>
                <LoginComponent {...this.props}/>

            </Wallpaper >
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConLogin)

