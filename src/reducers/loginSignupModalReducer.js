import { TOGGLE_POPUP_SIGNUP, TOGGLE_POPUP_LOGIN } from '../actions/types';

const initialState = {
    jumbotron: "",
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
                    jumbotron: "hidden",
                    signupmodal: "not-hidden",
                    signuppopup:true
                }
            } else {
                return{
                    ...state,
                    jumbotron: "not-hidden",
                    signupmodal: "hidden",
                    signuppopup:false
                }
            }

        case TOGGLE_POPUP_LOGIN:
        if ( state.loginpopup ===false){
            return{
                ...state,
                jumbotron: "hidden",
                loginmodal: "not-hidden",
                loginpopup:true
            }
        } else {
            return{
                ...state,
                jumbotron: "not-hidden",
                loginmodal: "hidden",
                loginpopup:false 
            }
        }
    }
}