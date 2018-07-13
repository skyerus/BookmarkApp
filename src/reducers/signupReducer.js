import { TOGGLE_POPUP } from '../actions/types';

const initialState = {
    popup: true
}

export default function(state=initialState, action){
    switch(action.type) 
    {
        default:
            return state;

        case TOGGLE_POPUP:
            return {
                ...state,
                popup: !state.popup
            }
    }
}