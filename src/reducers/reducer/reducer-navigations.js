import   {SAVE_NAVIGATIONS} from '../constant';
const initial ={
    home:{desc:"Home",data:[
        {menu: "home", display: "Home"},
    ]},
    employee:{desc:"Employee",data:[
        {menu: "employee-database", display: "Database"},
    ]},
    dashboard:{desc:"Dashboard",data:[]},
}


const reduceNavigations = (state = initial, action) => {
    let newState = state;
    switch (action.type) {
        case SAVE_NAVIGATIONS:
            newState = action.payload;
            return Object.assign({}, newState);
        default:
            return state
    }
}

export default reduceNavigations;