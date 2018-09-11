import {REORDER_BOOKMARKS, TOGGLE_EDIT, NEW_BOOKMARK_POPUP,CREATE_BOOKMARK_HAS_ERRORED, CREATE_BOOKMARK_IS_LOADING, CREATE_BOOKMARK_SUCCESS,CREATE_CATEGORY_HAS_ERRORED,CREATE_CATEGORY_IS_LOADING,CREATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_HAS_ERRORED,UPDATE_CATEGORY_IS_LOADING, JUST_CREATED_BOOKMARK, JUST_CREATED_CATEGORY, TOGGLE_BOOKMARK_FORM, TOGGLE_CATEGORY_FORM, UPDATE_CURRENT_CATEGORY, GO_BACK, DELETE_CATEGORY_HAS_ERRORED,REMOVE_CATEGORY_FROM_STATE, DELETE_BOOKMARK_HAS_ERRORED, REMOVE_BOOKMARK_FROM_STATE, BOOKMARK_JUST_DELETED, TOGGLE_EDIT_CATEGORY, TOGGLE_EDIT_BOOKMARK, NEW_CATEGORY_INFO, NEW_BOOKMARK_INFO, UPDATE_BOOKMARK_HAS_ERRORED, UPDATE_BOOKMARK_IS_LOADING} from './types';
import { updateCurrentOrderID } from './loginSignUpActions';

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

export const createBookmark = (title,about,link,category,orderid) => (dispatch) => 
    new Promise(function(resolve,reject) {
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
                    reject();
                    throw Error(response.statusText)
                }
                dispatch(createBookmarkIsLoading(false));
                // return [title,about,link,category,orderid];
                return response.json();
            })
            .then((bookmarkjson)=> dispatch(createBookmarkSuccess(bookmarkjson)))
            .then(()=> dispatch(justCreatedBookmarkFunc(true)))
            .then(() => dispatch(toggleNewBookmarkPopup(false)))
            .then(() => resolve())
            .catch(() => dispatch(createBookmarkHasErrored(true)));
    })


export function createCategoryHasErrored(bool,e) {
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

export const createCategory = (name,parent,children,bookmarkorder,categoryloc,order,orderid) => (dispatch) => 
    new Promise(function(resolve,reject){
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
                    reject();
                    throw Error(response.statusText);
                }
                dispatch(createCategoryIsLoading(false));
                // return [name,parent,children,bookmarkorder,categoryloc,order,userid,orderid,numberofchildren];
                return response.json();
            })
            .then((categoryjson) => dispatch(createCategorySuccess(categoryjson)))
            .then(()=> dispatch(justCreatedCategoryFunc(true)))
            .then(() => dispatch(toggleNewBookmarkPopup(false)))
            .then(() => resolve())
            .catch((e) => dispatch(createCategoryHasErrored(true,e)));
    })

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

export const updateCategory = (id,name,children,bookmarkorder,order,categoryloc) => (dispatch) => 
    new Promise(function(resolve,reject) {
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
                    reject();
                    throw Error(response.statusText)
                }
                dispatch(updateCategoryIsLoading(false));
                // return [name,parent,children,bookmarkorder,categoryloc,order,orderid,numberofchildren];
                // return response.json();
            })
            // .then(() => dispatch(updateCategorySuccess(true)))
            .then(() => dispatch(toggleEditCategory(false)))
            .then(() => resolve())
            .catch(() => {dispatch(updateCategoryHasErrored(true))});
    })

export function updateBookmarkHasErrored(bool) {
return {
    type: UPDATE_BOOKMARK_HAS_ERRORED,
    updateBookmarkHasErrored: bool
};
}

export function updateBookmarkIsLoading(bool) {
return {
    type: UPDATE_BOOKMARK_IS_LOADING,
    updateBookmarkIsLoading: bool
};
}

export const updateBookmark = (id,title,about,link) => (dispatch) => 
    new Promise(function(resolve,reject) {
        dispatch(updateBookmarkIsLoading(true));
        fetch('http://localhost:8080/api/user/bookmark', {
            method:'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            mode:"cors",
            credentials:"include",
            body: JSON.stringify({
                id,
                title,
                about,
                link
            })})
            .then((response)=>{
                if (!response.ok) {
                    dispatch(updateCategoryIsLoading(false));
                    reject();
                    throw Error(response.statusText)
                }
                dispatch(updateBookmarkIsLoading(false));
            })
            .then(() => dispatch(toggleEditBookmark(false, 0, "", "", "", 0)))
            .then(() => resolve())
            .catch(() => {dispatch(updateBookmarkHasErrored(true))});
})

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

export function updateCurrentCategory(category) {
    return {
        type: UPDATE_CURRENT_CATEGORY,
        updateCurrentCategory: category
    }
}

export function updateCurrentCategoryPromise(category) {
    return (dispatch) => {
        return new Promise(function(resolve,reject) {
            dispatch(updateCurrentCategory(category));
            resolve();
        })
    }
}

export function changeCategory(category) {
    return (dispatch) => {
        dispatch(updateCurrentCategoryPromise(category))
        .then(() => dispatch(updateCurrentOrderID()))
    }
}

export function goBack() {
    return (dispatch) => {
        dispatch(goBackPromise())
        .then(()=> dispatch(updateCurrentOrderID()))
    }
}

export function goBackPromise() {
    return (dispatch) => {
        return new Promise(function(resolve,reject){
            dispatch(goBackAction())
            resolve();
        })
    }
}

export function goBackAction() {
    return {
        type: GO_BACK
    }
}

export function deleteCategoryHasErrored() {
    return {
        type: DELETE_CATEGORY_HAS_ERRORED
    }
}

export function removeCategoryFromState(id) {
    return {
        type: REMOVE_CATEGORY_FROM_STATE,
        id
    }
}

export const deleteCategory = (id, categoryIndex) => (dispatch) =>
        new Promise(function(resolve,reject) {
            fetch('http://localhost:8080/api/user/category', {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            mode:"cors",
            credentials:"include",
            body: JSON.stringify({
                id
            })})
            .then((response)=>{
                if (!response.ok) {
                    console.log(response.status)
                    console.log("Error")
                    reject();
                    throw Error(response.statusText)
                }
            })
            .then(() => dispatch(removeCategoryFromState(categoryIndex)))
            .then( () => resolve())
            .catch(() => {dispatch(deleteCategoryHasErrored(true))});
        })


export function deleteBookmarkHasErrored() {
    return {
        type: DELETE_BOOKMARK_HAS_ERRORED
    }
}

export function removeBookmarkFromState(id) {
    return {
        type: REMOVE_BOOKMARK_FROM_STATE,
        id
    }
}

export function bookmarkJustDeleted(bool) {
    return {
        type: BOOKMARK_JUST_DELETED,
        bool
    }
}

export const deleteBookmark = (id, bookmarkIndex) => (dispatch) =>
        new Promise(function(resolve,reject) {
            fetch('http://localhost:8080/api/user/bookmark', {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            mode:"cors",
            credentials:"include",
            body: JSON.stringify({
                id
            })})
            .then((response)=>{
                if (!response.ok) {
                    console.log(response.status)
                    console.log("Error")
                    reject();
                    throw Error(response.statusText)
                }
            })
            .then(() => dispatch(removeBookmarkFromState(bookmarkIndex)))
            .then(() => dispatch(bookmarkJustDeleted(true)))
            .then( () => resolve())
            .catch(() => {dispatch(deleteBookmarkHasErrored(true))});
        })

export function toggleEditCategory(bool) {
    return {
        type: TOGGLE_EDIT_CATEGORY,
        bool
    }
}

export function toggleEditBookmark(bool, id, title, about, link, index) {
    return {
        type: TOGGLE_EDIT_BOOKMARK,
        bool,
        id,
        title,
        about,
        link,
        index
    }
}

export function updateCategoryInfo(name) {
    return {
        type: NEW_CATEGORY_INFO,
        name
    }
}

export function updateBookmarkInfo(title, about, link, index) {
    return {
        type: NEW_BOOKMARK_INFO,
        title,
        about,
        link,
        index
    }
}
