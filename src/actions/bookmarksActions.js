import {REORDER_BOOKMARKS, TOGGLE_EDIT, NEW_BOOKMARK_POPUP,CREATE_BOOKMARK_HAS_ERRORED, CREATE_BOOKMARK_IS_LOADING, CREATE_BOOKMARK_SUCCESS,CREATE_CATEGORY_HAS_ERRORED,CREATE_CATEGORY_IS_LOADING,CREATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_HAS_ERRORED,UPDATE_CATEGORY_IS_LOADING, JUST_CREATED_BOOKMARK, JUST_CREATED_CATEGORY, TOGGLE_BOOKMARK_FORM, TOGGLE_CATEGORY_FORM} from './types';

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

export function createBookmarkHasErrored(bool) {
    return {
        type: CREATE_BOOKMARK_HAS_ERRORED,
        createBookmarkHasErrored: bool
    };
}

export function createBookmarkIsLoading(bool) {
    return {
        type: CREATE_BOOKMARK_IS_LOADING,
        createBookmarkIsLoading: bool
    };
}

export function createBookmarkSuccess(bookmarkjson) {
    return {
        type: CREATE_BOOKMARK_SUCCESS,
        bookmarkjson
    };
}

export function justCreatedBookmarkFunc(bool) {
    return {
        type: JUST_CREATED_BOOKMARK,
        justCreatedBookmark: bool
    }
}

export function createBookmark(title,about,link,category,orderid) {
    return (dispatch) => {
        dispatch(createBookmarkIsLoading(true));
        fetch('http://localhost:8080/api/user/bookmark', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            mode:"cors",
            credentials:"include",
            body: JSON.stringify({
                title,
                about,
                link,
                category,
                orderid
            })})
            .then((response)=>{
                if (!response.ok) {
                    dispatch(createBookmarkIsLoading(false));
                    throw Error(response.statusText)
                }
                dispatch(createBookmarkIsLoading(false));
                // return [title,about,link,category,orderid];
                return response.json();
            })
            .then((bookmarkjson)=> dispatch(createBookmarkSuccess(bookmarkjson)))
            .then(()=> dispatch(justCreatedBookmarkFunc(true)))
            .catch(() => dispatch(createBookmarkHasErrored(true)));
    }
}

export function createCategoryHasErrored(bool,e) {
    console.log(e)
    return {
        type: CREATE_CATEGORY_HAS_ERRORED,
        createCategoryHasErrored: bool,
    };
}

export function createCategoryIsLoading(bool) {
    return {
        type: CREATE_CATEGORY_IS_LOADING,
        createCategoryIsLoading: bool
    };
}

export function createCategorySuccess(categoryjson) {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        categoryjson
    };
}

export function justCreatedCategoryFunc(bool) {
    return {
        type: JUST_CREATED_CATEGORY,
        justCreatedCategory: bool
    }
}

export function createCategory(name,parent,children,bookmarkorder,categoryloc,order,orderid) {
    return (dispatch) => {
        dispatch(createCategoryIsLoading(true));
        fetch('http://localhost:8080/api/user/category', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            mode:"cors",
            credentials:"include",
            body: JSON.stringify({
                name,
                parent,
                children,
                bookmarkorder,
                categoryloc,
                order,
                orderid
            })})
            .then((response)=>{
                if (!response.ok) {
                    dispatch(createCategoryIsLoading(false));
                    throw Error(response.statusText);
                }
                dispatch(createCategoryIsLoading(false));
                // return [name,parent,children,bookmarkorder,categoryloc,order,userid,orderid,numberofchildren];
                return response.json();
            })
            .then((categoryjson) => dispatch(createCategorySuccess(categoryjson)))
            .then(()=> dispatch(justCreatedCategoryFunc(true)))
            .catch((e) => dispatch(createCategoryHasErrored(true,e)));
    }
}

export function updateCategoryHasErrored(bool) {
    return {
        type: UPDATE_CATEGORY_HAS_ERRORED,
        updateCategoryHasErrored: bool
    };
}

export function updateCategoryIsLoading(bool) {
    return {
        type: UPDATE_CATEGORY_IS_LOADING,
        updateCategoryIsLoading: bool
    };
}

// export function updateCategorySuccess(bool) {
//     return {
//         type: UPDATE_CATEGORY_SUCCESS,
//         updateCategorySuccess: bool
//     };
// }

export function updateCategory(id,name,children,bookmarkorder,order,categoryloc) {
    return (dispatch) => {
        dispatch(updateCategoryIsLoading(true));
        fetch('http://localhost:8080/api/user/category', {
            method:'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            mode:"cors",
            credentials:"include",
            body: JSON.stringify({
                name,
                children,
                bookmarkorder,
                categoryloc,
                order,
                id
            })})
            .then((response)=>{
                if (!response.ok) {
                    dispatch(updateCategoryIsLoading(false));
                    throw Error(response.statusText)
                }
                dispatch(updateCategoryIsLoading(false));
                // return [name,parent,children,bookmarkorder,categoryloc,order,orderid,numberofchildren];
                // return response.json();
            })
            // .then(() => dispatch(updateCategorySuccess(true)))
            .catch(() => dispatch(updateCategoryHasErrored(true)));
    }
}

export function toggleBookmarkForm(bool) {
    return {
        type: TOGGLE_BOOKMARK_FORM,
        addBookmark: bool
    }
}

export function toggleCategoryForm(bool) {
    return {
        type: TOGGLE_CATEGORY_FORM,
        addCategory: bool
    }
}