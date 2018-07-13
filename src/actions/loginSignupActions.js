import {TOGGLE_POPUP} from './types';

export const togglePopup = () => dispatch => {
    dispatch({
        type: TOGGLE_POPUP
    })
}
