
import   {LOGGED_IN} from '../constant';
const initial ={
    Token:null,
    User:null,
    Date:null,
    Time:null,
}


const reduceLogin = (state = initial, action) => {
    let newState = state;
    switch (action.type) {
        case LOGGED_IN:
            newState = action.payload;
            return Object.assign({}, newState);
        default:
            return state
    }
}

export default reduceLogin;
