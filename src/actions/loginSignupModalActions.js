import {TOGGLE_POPUP_SIGNUP,TOGGLE_POPUP_LOGIN} from './types';

export function togglePopupSignup(bool) {
    return {
        type: TOGGLE_POPUP_SIGNUP,
        signuppopup: bool
    }
}

export function togglePopupLogin(bool) {
    return {
        type: TOGGLE_POPUP_LOGIN,
        loginpopup: bool
    }
}

