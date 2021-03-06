import { SIGNUP_HAS_ERRORED, SIGNUP_IS_LOADING, JUST_SIGNED_UP, USER_ALREADY_EXISTS} from '../actions/types';

const initialState = {
    signUpHasErrored: false,
    signUpIsLoading: false,
    justSignedUp: false,
    userAlreadyExists: false
}

export default function(state=initialState, action){
    switch(action.type)
    {
        default:
            return state;

        case SIGNUP_IS_LOADING:
            return {
                ...state,
                signUpIsLoading: action.signUpIsLoading
            }

        case SIGNUP_HAS_ERRORED:
            return {
                ...state,
                signUpHasErrored: action.hasErrored
            }

        case JUST_SIGNED_UP:
            return {
                ...state,
                justSignedUp: action.justSignedUp
            }

        case USER_ALREADY_EXISTS:
            return {
                ...state,
                userAlreadyExists: action.hasErrored
            }
    }
}