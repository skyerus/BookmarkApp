import { LOGIN_HAS_EXPIRED,LOGIN_HAS_ERRORED,LOGIN_IS_LOADING, LOGIN_SUCCESS,LOGOUT_HAS_ERRORED,LOGOUT_IS_LOADING,LOGOUT_SUCCESS, SIGNUP_HAS_ERRORED, SIGNUP_IS_LOADING, JUST_SIGNED_UP, ADD_USER_ID, INIT_STATE, HYDRATE_CATEGORIES_IS_LOADING, HYDRATE_BOOKMARKS_IS_LOADING, HYDRATE_CATEGORIES_STATE, HYDRATE_BOOKMARKS_STATE, HYDRATE_CATEGORIES_HAS_ERRORED, HYDRATE_BOOKMARKS_HAS_ERRORED, UPDATE_CURRENT_ORDER_ID, USER_ALREADY_EXISTS, INCORRECT_PASSWORD, USER_NO_EXISTS} from './types';
import { updateCurrentCategory } from './bookmarksActions';

export function loginHasErroredFunc(bool,code) {
    if (code===404) {
        return {
            type: USER_NO_EXISTS,
            loginHasErrored: bool
        }
    } else if (code===403) {
        return {
            type: INCORRECT_PASSWORD,
            loginHasErrored: bool
        }
    }
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

export function loginHasExpired() {
    return {
        type: LOGIN_HAS_EXPIRED
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
                    dispatch(loginIsLoading(false));
                    throw response.status;
                }
                dispatch(loginIsLoading(false));
                return response.json();
            })
            .then((response)=> {dispatch(loginSuccess(u)); return response})
            .then((response)=> {dispatch(addUserID(response.id));return response})
            .then((response) => {dispatch(initState());return response})
            .then(() => {dispatch(hydrateCategories());dispatch(hydrateBookmarks())})
            .then(() => dispatch(updateCurrentOrderID()))
            .catch((response) => dispatch(loginHasErroredFunc(true, response)))
        
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
                dispatch(toggleJustSignedUp(false));
                dispatch(logoutIsLoading(false));
            })
            .then(()=>dispatch(updateCurrentCategory(0)))
            .then(()=>{
                dispatch(logoutSuccess());
            })
            .then(() => dispatch(addUserID(0)))
            .catch(()=> dispatch(logoutHasErrored(true)))
    }
}

export function signUpHasErroredFunc(bool, response) {
    if (response===409) {
        return {
            type: USER_ALREADY_EXISTS,
            hasErrored: bool
        }; 
    }
    return {
        type: SIGNUP_HAS_ERRORED,
        hasErrored: bool
    };
}

export function signUpIsLoading(bool) {
    return {
        type: SIGNUP_IS_LOADING,
        signUpIsLoading: bool
    };
}

export function toggleJustSignedUp(bool){
    return {
        type: JUST_SIGNED_UP,
        justSignedUp: bool
    }
}

export function addUserID(id) {
    return {
        type: ADD_USER_ID,
        id
    }
}

export function initState() {
    return {
        type: INIT_STATE
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
            dispatch(signUpIsLoading(false));
            if (!response.ok){
                throw response.status;
            }
            dispatch(toggleJustSignedUp(true));
            return response.json();
        })
        .then((response)=> {dispatch(loginSuccess(u)); return response})
        .then((response)=> dispatch(addUserID(response.id)))
        .then(() => dispatch(initState()))
        .then(()=>dispatch(signUpHasErroredFunc(false,409)))
        .catch((response)=>dispatch(signUpHasErroredFunc(true,response)));
    }
}

export function hydrateCategories() {
    return (dispatch) => {
        dispatch(hydrateCategoriesIsLoading(true));
        fetch('http://localhost:8080/api/user/categories', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
            mode: "cors",
            credentials: "include"
        })
        .then((response)=> {
            if (!response.ok){
                throw Error(response.statusText)
            }
            dispatch(hydrateCategoriesIsLoading(false));
            return response.json();
        })
        .then((response)=> dispatch(hydrateCategoriesState(response)))
        .catch(() => dispatch(hydrateCategoriesHasErrored(true)))
    }
}

export function hydrateCategoriesIsLoading(bool) {
    return {
        type: HYDRATE_CATEGORIES_IS_LOADING,
        hydrateCategoriesIsLoading: bool
    }
}

export function hydrateCategoriesState(categoriesArray) {
    return {
        type: HYDRATE_CATEGORIES_STATE,
        categoriesArray
    }
}

export function hydrateCategoriesHasErrored(bool) {
    return {
        type: HYDRATE_CATEGORIES_HAS_ERRORED,
        hydrateCategoriesHasErrored: bool
    }
}

export function hydrateBookmarks() {
    return (dispatch) => {
        dispatch(hydrateBookmarksIsLoading(true));
        fetch('http://localhost:8080/api/user/bookmarks', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
            mode: "cors",
            credentials: "include"
        })
        .then((response)=> {
            if (!response.ok){
                throw Error(response.statusText)
            }
            dispatch(hydrateBookmarksIsLoading(false));
            return response.json();
        })
        .then((response)=> dispatch(hydrateBookmarksState(response)))
        .catch(() => dispatch(hydrateBookmarksHasErrored(true)))
    }
}

export function hydrateBookmarksIsLoading(bool) {
    return {
        type: HYDRATE_BOOKMARKS_IS_LOADING,
        hydrateBookmarksIsLoading: bool
    }
}

export function hydrateBookmarksState(bookmarksArray) {
    return {
        type: HYDRATE_BOOKMARKS_STATE,
        bookmarksArray
    }
}

export function hydrateBookmarksHasErrored(bool) {
    return {
        type: HYDRATE_BOOKMARKS_HAS_ERRORED,
        hydrateBookmarksHasErrored: bool
    }
}

export function updateCurrentOrderID() {
    return {
        type: UPDATE_CURRENT_ORDER_ID,
    }
}