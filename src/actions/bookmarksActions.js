import {REORDER_BOOKMARKS, TOGGLE_EDIT} from './types';

export const reorderBookmarks = (newIndex,receivedIndex) => dispatch => {
    dispatch({
        type: REORDER_BOOKMARKS,
        payload: [newIndex,receivedIndex]
    })
}

export const toggleEdit = () => dispatch => {
    dispatch({
        type: TOGGLE_EDIT
    })
}