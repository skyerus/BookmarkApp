import { TOGGLE_POPUP_SIGNUP, TOGGLE_POPUP_LOGIN } from '../actions/types';

const initialState = {
    signuppopup: false,
    loginpopup: false
}

export default function(state=initialState, action){
    switch(action.type) 
    {
        default:
            return state;

        case TOGGLE_POPUP_SIGNUP:
            return {
                ...state,
                signuppopup: action.signuppopup
            }

        case TOGGLE_POPUP_LOGIN:
            return {
                ...state,
                loginpopup: action.loginpopup
            }
    }
}