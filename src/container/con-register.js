
import React, { Component } from 'react';


import Wallpaper from '../component/common/ef-wallper';
import RegisterComponent from '../component/comp-register';

class ConRegister extends Component {
    render() {
        return (
            <Wallpaper hasHeader={false} hasFooter={true}>
                <RegisterComponent />

            </Wallpaper>
        );
    }
}

export default ConRegister;