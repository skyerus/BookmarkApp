import { LOGIN_HAS_EXPIRED,LOGIN_HAS_ERRORED,LOGIN_IS_LOADING, LOGIN_SUCCESS, LOGOUT_HAS_ERRORED, LOGOUT_IS_LOADING, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
    isLoggedIn:false,
    username:"",
    userID:null,
    loginHasErrored:false,
    redirectLogin: false,
    loginIsLoading: false,
    logoutHasErrored: false,
    logoutIsLoading: false
}

export default function(state=initialState, action){
    switch(action.type) 
    {
        default:
            return state;

        case LOGIN_SUCCESS:
            return {
                ...state,
                username: action.username,
                isLoggedIn: true,
                redirectLogin: true
            }

        case LOGIN_HAS_EXPIRED:
            return {
                ...state,
                username: "",
                isLoggedIn:false,
                redirectLogin: false
            }

        case LOGIN_IS_LOADING:
            return {
                ...state,
                loginIsLoading: action.loginIsLoading
            }

        case LOGIN_HAS_ERRORED:
            return {
                ...state,
                loginHasErrored: action.loginHasErrored
            }

        case LOGOUT_HAS_ERRORED:
            return {
                ...state,
                logoutHasErrored: action.logoutHasErrored
            }

        case LOGOUT_IS_LOADING:
            return {
                ...state,
                logoutIsLoading: action.logoutIsLoading
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                redirectLogin: false,
                username:""
            }
            
            
    }

}