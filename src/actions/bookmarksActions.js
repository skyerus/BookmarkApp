import {REORDER_BOOKMARKS} from '../actions/types';

export const reorderBookmarks = (newIndex,receivedIndex) => dispatch => {
    dispatch({
        type: REORDER_BOOKMARKS,
        payload: [newIndex,receivedIndex]
    })
}