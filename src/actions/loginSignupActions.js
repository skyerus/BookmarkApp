import {TOGGLE_POPUP_SIGNUP,TOGGLE_POPUP_LOGIN} from './types';

export const togglePopupSignup = () => dispatch => {
    dispatch({
        type: TOGGLE_POPUP_SIGNUP
    })
}

export const togglePopupLogin = () => dispatch => {
    dispatch({
        type: TOGGLE_POPUP_LOGIN
    })
}

