import {REORDER_BOOKMARKS, TOGGLE_EDIT, NEW_BOOKMARK_POPUP, CREATE_BOOKMARK_SUCCESS, CREATE_BOOKMARK_HAS_ERRORED, CREATE_BOOKMARK_IS_LOADING, CREATE_CATEGORY_IS_LOADING, CREATE_CATEGORY_HAS_ERRORED, CREATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_HAS_ERRORED, UPDATE_CATEGORY_IS_LOADING, JUST_CREATED_BOOKMARK, JUST_CREATED_CATEGORY, TOGGLE_BOOKMARK_FORM, TOGGLE_CATEGORY_FORM, ADD_USER_ID, INIT_STATE, HYDRATE_BOOKMARKS_STATE, HYDRATE_CATEGORIES_STATE} from '../actions/types';

const initialState = {
    categories: {
        
    },
    bookmarks: {
    },
    edit: "",
    newBookmarkPopup: false,
    currentCategory: 0,
    createBookmarkHasErrored: false,
    createBookmarkIsLoading: false,
    currentOrderID:1,
    createCategoryHasErrored: false,
    createCategoryIsLoading: false,
    updateBookmarkHasErrored: false,
    updateBookmarkIsLoading: false,
    numberOfCategories: 0,
    numberOfBookmarks: 0,
    justCreatedBookmark: false,
    justCreatedCategory: false,
    addBookmark: true,
    addCategory: false,
    userID: null
}

function reorderIndex(newIndex,receivedIndex,state) {
    let newOrder = state.order.slice(0)
    let newCategoryLoc = state.categoryLoc.slice(0)
    let placed = false
    if (newIndex < receivedIndex){
        for (let i=0;i<state.order.length;i++) {
            if (placed){
                if (i>receivedIndex){
                    break
                } else {
                    newOrder[i]=state.order[i-1]
                    newCategoryLoc[i] = state.categoryLoc[i-1]
                }
            } else if (i===newIndex) {
                newOrder[i]=state.order[receivedIndex]
                newCategoryLoc[i] = state.categoryLoc[receivedIndex]
                placed=true
            } else {
                newOrder[i] = state.order[i]
                newCategoryLoc[i] = state.categoryLoc[i]
            }
        }
    } else {
        for (let i=state.order.length-1;i>=0;i--) {
            if (placed){
                if (i<receivedIndex){
                    break
                } else {
                    newOrder[i]=state.order[i+1]
                    newCategoryLoc[i] = state.categoryLoc[i+1]
                }
            } else if (i===newIndex) {
                newOrder[i]=state.order[receivedIndex]
                newCategoryLoc[i] = state.categoryLoc[receivedIndex]
                placed=true
            } else {
                newOrder[i] = state.order[i]
                newCategoryLoc[i] = state.categoryLoc[i]
            }
        }
    } return [newOrder,newCategoryLoc]

}

export default function(state = initialState, action) {
    switch(action.type)
    {
        default:
            return state;

        case CREATE_BOOKMARK_SUCCESS:
            let bookmarkId = state.bookmarks[state.userID].length
            let bookmarkOrderLength = state.categories[state.userID][state.currentCategory].bookmarkOrder.length
            return {
                ...state,
                numberOfBookmarks: bookmarkId+1,
                categories : {
                    ...state.categories,
                    [state.userID]: [
                        ...state.categories[state.userID].slice(0,state.currentCategory),
                        {
                            ...state.categories[state.userID][state.currentCategory],
                            bookmarkOrder:[...state.categories[state.userID][state.currentCategory].bookmarkOrder, bookmarkId],
                            order:[...state.categories[state.userID][state.currentCategory].order, bookmarkOrderLength],
                            categoryLoc:[...state.categories[state.userID][state.currentCategory].categoryLoc, 0],
                        },
                        ...state.categories[state.userID].slice(state.currentCategory+1)
                    ]
                },
                bookmarks : {
                    ...state.bookmarks,
                    [state.userID]:
                    [
                        ...state.bookmarks[state.userID],
                        {
                        id: action.bookmarkjson.id,
                        title:action.bookmarkjson.title,
                        about:action.bookmarkjson.about,
                        link: action.bookmarkjson.link,
                        userID:action.bookmarkjson.userid,
                        orderID:action.bookmarkjson.orderid
                        }
                    ]
                },
                currentOrderID: state.currentOrderID +1
            }

        case CREATE_BOOKMARK_HAS_ERRORED:
            return {
                ...state,
                createBookmarkHasErrored: action.createBookmarkHasErrored
            }

        case CREATE_BOOKMARK_IS_LOADING:
            return {
                ...state,
                createBookmarkIsLoading: action.createBookmarkIsLoading
            }

        case JUST_CREATED_BOOKMARK:
            return {
                ...state,
                justCreatedBookmark: action.justCreatedBookmark
            }

        case CREATE_CATEGORY_SUCCESS:
            let categoriesLength = state.categories[state.userID].length;
            if (categoriesLength===0) {
                return {
                    ...state,
                    numberOfCategories: categoriesLength+1,
                    categories: {
                        ...state.categories,
                        [state.userID]: [
                            {
                                id:action.categoryjson.id,
                                name:action.categoryjson.name,
                                parent:action.categoryjson.parents,
                                children: action.categoryjson.children,
                                bookmarkOrder: action.categoryjson.bookmarkorder,
                                categoryLoc: action.categoryjson.categoryloc,
                                order: action.categoryjson.order,
                                userID: action.categoryjson.userid,
                                orderID: action.categoryjson.orderid
                            }
                        ]
                    }
                }
            } else {
                let childrenLength = state.categories[state.userID][state.currentCategory].children.length
                return {
                    ...state,
                    numberOfCategories: categoriesLength +1,
                    categories: {
                        ...state.categories,
                        [state.userID]: [
                            ...state.categories[state.userID].slice(0,state.currentCategory),
                            {
                                ...state.categories[state.userID][state.currentCategory],
                                children: [...state.categories[state.userID][state.currentCategory].children,categoriesLength],
                                order:[...state.categories[state.userID][state.currentCategory].order, childrenLength],
                                categoryLoc:[...state.categories[state.userID][state.currentCategory].categoryLoc, 1]
                            },
                            ...state.categories[state.userID].slice(state.currentCategory+1),
                            {
                                id:action.categoryjson.id,
                                name:action.categoryjson.name,
                                parent:action.categoryjson.parents,
                                children: action.categoryjson.children,
                                bookmarkOrder: action.categoryjson.bookmarkorder,
                                categoryLoc: action.categoryjson.categoryloc,
                                order: action.categoryjson.order,
                                userID: action.categoryjson.userid,
                                orderID: action.categoryjson.orderid
                            }
                        ]
                    },
                    currentOrderID: state.currentOrderID +1
                }
            }

        case CREATE_CATEGORY_HAS_ERRORED:
            return {
                ...state,
                createCategoryHasErrored: action.createCategoryHasErrored
            }

        case CREATE_CATEGORY_IS_LOADING:
            return {
                ...state,
                createCategoryIsLoading: action.createCategoryIsLoading
            }

        case JUST_CREATED_CATEGORY:
        return {
            ...state,
            justCreatedCategory: action.justCreatedCategory
        }

        case UPDATE_CATEGORY_HAS_ERRORED:
            return {
                ...state,
                updateCategoryHasErrored: action.updateCategoryHasErrored
            }

        case UPDATE_CATEGORY_IS_LOADING:
            return {
                ...state,
                updateCategoryIsLoading: action.updateCategoryIsLoading
            }

        case REORDER_BOOKMARKS:
            let [newOrder,newCategoryLoc] = reorderIndex(action.payload[0],action.payload[1],state.categories[state.userID][state.currentCategory])
            return {
                ...state,
                categories : {
                    ...state.categories,
                    [state.userID] : [
                        ...state.categories[state.userID].slice(0,state.currentCategory),
                        {
                            ...state.categories[state.userID][state.currentCategory],
                            order: newOrder,
                            categoryLoc: newCategoryLoc
                        },
                        ...state.categories[state.userID].slice(state.currentCategory+1)
                    ]
                }
            }
            

        case TOGGLE_EDIT:
            if (state.edit==="edit-display") {
                return {
                    ...state,
                    edit: ""
                }
            } else {
                return {
                    ...state,
                    edit:"edit-display"
                }
            }

        case NEW_BOOKMARK_POPUP:
            return {
                ...state,
                newBookmarkPopup: action.newBookmarkPopup
            }

        case TOGGLE_BOOKMARK_FORM:
            return {
                ...state,
                addBookmark: action.addBookmark
            }

        case TOGGLE_CATEGORY_FORM:
            return {
                ...state,
                addCategory: action.addCategory
            }

        case ADD_USER_ID:
            return {
                ...state,
                userID: action.id
            }

        case INIT_STATE:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [state.userID]: [

                    ]
                },
                bookmarks: {
                    ...state.bookmarks,
                    [state.userID]: [

                    ]
                }
            }

        case HYDRATE_BOOKMARKS_STATE:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    [state.userID] : [
                        ...state.bookmarks[state.userID],
                        ...action.bookmarksArray
                    ]
                }
            }

        case HYDRATE_CATEGORIES_STATE:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [state.userID] : [
                        ...state.categories[state.userID],
                        ...action.categoriesArray
                    ]
                }
            }
            


    }
}