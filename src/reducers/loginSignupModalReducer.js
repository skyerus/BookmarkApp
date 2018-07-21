import { TOGGLE_POPUP_SIGNUP, TOGGLE_POPUP_LOGIN } from '../actions/types';

const initialState = {
    signupmodal: "hidden",
    loginmodal: "hidden",
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
                    signupmodal: "not-hidden",
                    signuppopup:true
                }
            } else {
                return{
                    ...state,
                    signupmodal: "hidden",
                    signuppopup:false
                }
            }

        case TOGGLE_POPUP_LOGIN:
        if ( state.loginpopup ===false){
            return{
                ...state,
                loginmodal: "not-hidden",
                loginpopup:true
            }
        } else {
            return{
                ...state,
                loginmodal: "hidden",
                loginpopup:false 
            }
        }
    }
}