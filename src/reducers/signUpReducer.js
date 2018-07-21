import { SIGNUP_HAS_ERRORED, SIGNUP_IS_LOADING} from '../actions/types';

const initialState = {
    signUpHasErrored: false,
    signUpIsLoading: false
}

export default function(state=initialState, action){
    switch(action.type)
    {
        default:
            return state;

        case SIGNUP_IS_LOADING:
            return {
                ...state,
                signUpIsLoading: true
            }

        case SIGNUP_HAS_ERRORED:
            return {
                ...state,
                signUpHasErrored: true
            }
    }
}