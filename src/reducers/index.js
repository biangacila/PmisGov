import { combineReducers } from 'redux';

import menus from './reducer/reducer-menus';
import login from './reducer/reducer-login';
import navigations from './reducer/reducer-navigations';


export default combineReducers({
    menus,
    login,
    navigations
})