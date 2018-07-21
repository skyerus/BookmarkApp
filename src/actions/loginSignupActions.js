import { RELOGIN,LOGIN_HAS_ERRORED,LOGIN_IS_LOADING, LOGIN_SUCCESS,LOGOUT_HAS_ERRORED,LOGOUT_IS_LOADING,LOGOUT_SUCCESS, SIGNUP_HAS_ERRORED, SIGNUP_IS_LOADING, JUST_SIGNED_UP} from './types';

export function loginHasErrored(bool) {
    return {
        type: LOGIN_HAS_ERRORED,
        loginHasErrored: bool
    };
}

export function loginIsLoading(bool) {
    return {
        type: LOGIN_IS_LOADING,
        loginIsLoading: bool
    };
}

export function loginSuccess(username) {
    return {
        type: LOGIN_SUCCESS,
        username
    };
}

export function relogin() {
    return {
        type: RELOGIN,
    }
}

export function login(u,pw) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            mode: "cors",
            credentials:"include",
            body: JSON.stringify({
                username: u,
                password: pw
            })})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loginIsLoading(false));
                return u;
            })
            .then((u) => dispatch(loginSuccess(u)))
            .catch(() => dispatch(loginHasErrored(true)));
        
    }
}

export function logoutHasErrored(bool) {
    return {
        type: LOGOUT_HAS_ERRORED,
        logoutHasErrored:bool
    }
}

export function logoutIsLoading(bool) {
    return {
        type: LOGOUT_IS_LOADING,
        logoutIsLoading: bool
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logout() {
    return (dispatch) => {
        dispatch(logoutIsLoading(true));
        fetch('http://localhost:8080/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
            mode: "cors",
            credentials:"include",
            })
            .then((response)=>{
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(logoutIsLoading(false));
            }).then(()=>{
                dispatch(logoutSuccess());
            }).catch(()=> dispatch(logoutHasErrored(true)))
    }
}

export function signUpHasErrored(bool) {
    return {
        type: SIGNUP_HAS_ERRORED,
        hasErrored: bool
    };
}

export function signUpIsLoading(bool) {
    return {
        type: SIGNUP_IS_LOADING,
        loginIsLoading: bool
    };
}

export function toggleJustSignedUp(bool){
    return {
        type: JUST_SIGNED_UP,
        justSignedUp: bool
    }
}

export function signUp(u,em,pw) {
    return (dispatch) => {
        dispatch(signUpIsLoading(true));
        fetch('http://localhost:8080/api/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
            username:u,
            email:em,
            password:pw
        })})
        .then((response) => {
            if (!response.ok){
                console.log(response.status);
                throw Error(response.statusText);
            }
            dispatch(signUpIsLoading(false));
            dispatch(toggleJustSignedUp(true));
            return u;
        })
        .then((u)=> dispatch(loginSuccess(u)))
        .catch(()=>dispatch(signUpHasErrored(true)));
    }
}