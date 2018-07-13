import { TOGGLE_POPUP_SIGNUP, TOGGLE_POPUP_LOGIN } from '../actions/types';

const initialState = {
    jumbotron: "",
    signupmodal: "hidden",
    loginmodal: "hidden"
}

export default function(state=initialState, action){
    switch(action.type) 
    {
        default:
            return state;

        case TOGGLE_POPUP_SIGNUP:
            if ( state.jumbotron ===""){
                return{
                    ...state,
                    jumbotron: "hidden",
                    signupmodal: "not-hidden"
                }
            } else {
                return{
                    ...state,
                    jumbotron: "",
                    signupmodal: "hidden" 
                }
            };

        case TOGGLE_POPUP_LOGIN:
        if ( state.jumbotron ===""){
            return{
                ...state,
                jumbotron: "hidden",
                loginmodal: "not-hidden"
            }
        } else {
            return{
                ...state,
                jumbotron: "",
                loginmodal: "hidden" 
            }
        }
    }
}