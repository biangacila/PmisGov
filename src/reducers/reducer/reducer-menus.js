import {
    SAVE_NAVIGATION_MENU,
    SAVE_NAVIGATION_MODULE
} from "../constant";


const initial ={
    PageModule:"home",
    PageMenu:"",
}


const reduceMenus = (state = initial, action) => {
    let newState = state;
    switch (action.type) {
        case SAVE_NAVIGATION_MODULE:
            newState.PageModule = action.payload;
            return Object.assign({}, newState);
        case SAVE_NAVIGATION_MENU:
            newState.PageMenu = action.payload;
            return Object.assign({}, newState);
        default:
            return state
    }
}

export default reduceMenus;
