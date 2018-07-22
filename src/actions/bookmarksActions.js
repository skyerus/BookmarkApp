import {REORDER_BOOKMARKS, TOGGLE_EDIT, NEW_BOOKMARK_POPUP} from './types';

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

export function toggleNewBookmarkPopup(bool) {
    return {
        type: NEW_BOOKMARK_POPUP,
        newBookmarkPopup: bool
    }
}