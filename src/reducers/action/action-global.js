import {
    LOGGED_IN,
    SAVE_NAVIGATION_MODULE,
    SAVE_NAVIGATION_MENU,
}
    from '../constant';

const SaveLoginInfo = (payload) => {
    return {
        type: LOGGED_IN,
        payload
    }
}

const SetNavigateModule = (payload) => {
    return {
        type: SAVE_NAVIGATION_MODULE,
        payload
    }
}

const SetNavigateMenu = (payload) => {
    return {
        type: SAVE_NAVIGATION_MENU,
        payload
    }
}

export {
    SaveLoginInfo,
    SetNavigateModule,
    SetNavigateMenu
}
