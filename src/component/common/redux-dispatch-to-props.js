import React from 'react';
import {
    SaveLoginInfo,
    SetNavigateModule,
    SetNavigateMenu
} from "../../reducers/action/action-global";




const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
        SaveLoginInfo: (data) => dispatch(SaveLoginInfo(data)),
        SetNavigateModule:(data)=>dispatch(SetNavigateModule(data)),
        SetNavigateMenu:(data)=>dispatch(SetNavigateMenu(data)),
    }
}


const mapStateToProps = state => ({
    login: state.login,
    menus: state.menus,
    navigations:state.navigations
});
export { mapDispatchToProps,mapStateToProps};