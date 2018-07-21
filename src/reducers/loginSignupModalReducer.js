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
            if ( state.signuppopup ===false){
                return{
                    ...state,
                    signuppopup:true
                }
            } else {
                return{
                    ...state,
                    signuppopup:false
                }
            }

        case TOGGLE_POPUP_LOGIN:
        if ( state.loginpopup ===false){
            return{
                ...state,
                loginpopup:true
            }
        } else {
            return{
                ...state,
                loginpopup:false 
            }
        }
    }
}