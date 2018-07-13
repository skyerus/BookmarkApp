import { TOGGLE_POPUP } from '../actions/types';

const initialState = {
    jumbotron: "not-hidden",
    modal: "hidden"
}

export default function(state=initialState, action){
    switch(action.type) 
    {
        default:
            return state;

        case TOGGLE_POPUP:
            if ( state.jumbotron =="not-hidden"){
                return{
                    ...state,
                    jumbotron: "hidden",
                    modal: "not-hidden"
                }
            } else {
                return{
                    ...state,
                    jumbotron: "not-hidden",
                    modal: "hidden" 
                }
            }
    }
}