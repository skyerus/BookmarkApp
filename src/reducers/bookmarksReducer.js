import {REORDER_BOOKMARKS, TOGGLE_EDIT, NEW_BOOKMARK_POPUP, CREATE_BOOKMARK_SUCCESS, CREATE_BOOKMARK_HAS_ERRORED, CREATE_BOOKMARK_IS_LOADING, CREATE_CATEGORY_IS_LOADING, CREATE_CATEGORY_HAS_ERRORED, CREATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_HAS_ERRORED, UPDATE_CATEGORY_IS_LOADING, JUST_CREATED_BOOKMARK, JUST_CREATED_CATEGORY, TOGGLE_BOOKMARK_FORM, TOGGLE_CATEGORY_FORM, ADD_USER_ID, INIT_STATE, HYDRATE_BOOKMARKS_STATE, HYDRATE_CATEGORIES_STATE, UPDATE_CURRENT_CATEGORY, GO_BACK, UPDATE_CURRENT_ORDER_ID, REMOVE_CATEGORY_FROM_STATE, REMOVE_BOOKMARK_FROM_STATE, BOOKMARK_JUST_DELETED, TOGGLE_EDIT_BOOKMARK, TOGGLE_EDIT_CATEGORY, NEW_CATEGORY_INFO, NEW_BOOKMARK_INFO} from '../actions/types';

const initialState = {
    categories: {
        0 : [
            {
            id:0,
            name:"",
            parent:"",
            children: [],
            bookmarkorder: [],
            categoryloc: [],
            order: [],
            userid: 0,
            orderid: 0
            }
        ]
    },
    bookmarks: {
    },
    bookmarkToEdit: {
        id:0,
        title:"",
        about: "",
        link: "",
        index: 0
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
    userID: 0,
    history: [],
    editBool: false,
    bookmarkWasJustDeleted: false,
    editCategory: false,
    editBookmark: false
}

function reorderIndex(newIndex,receivedIndex,state) {
    let newOrder = state.order.slice(0)
    let newCategoryLoc = state.categoryloc.slice(0)
    let placed = false
    if (newIndex < receivedIndex){
        for (let i=0;i<state.order.length;i++) {
            if (placed){
                if (i>receivedIndex){
                    break
                } else {
                    newOrder[i]=state.order[i-1]
                    newCategoryLoc[i] = state.categoryloc[i-1]
                }
            } else if (i===newIndex) {
                newOrder[i]=state.order[receivedIndex]
                newCategoryLoc[i] = state.categoryloc[receivedIndex]
                placed=true
            } else {
                newOrder[i] = state.order[i]
                newCategoryLoc[i] = state.categoryloc[i]
            }
        }
    } else {
        for (let i=state.order.length-1;i>=0;i--) {
            if (placed){
                if (i<receivedIndex){
                    break
                } else {
                    newOrder[i]=state.order[i+1]
                    newCategoryLoc[i] = state.categoryloc[i+1]
                }
            } else if (i===newIndex) {
                newOrder[i]=state.order[receivedIndex]
                newCategoryLoc[i] = state.categoryloc[receivedIndex]
                placed=true
            } else {
                newOrder[i] = state.order[i]
                newCategoryLoc[i] = state.categoryloc[i]
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
            let bookmarkOrderLength = state.categories[state.userID][state.currentCategory].bookmarkorder.length
            return {
                ...state,
                numberOfBookmarks: bookmarkId+1,
                categories : {
                    ...state.categories,
                    [state.userID]: [
                        ...state.categories[state.userID].slice(0,state.currentCategory),
                        {
                            ...state.categories[state.userID][state.currentCategory],
                            bookmarkorder:[...state.categories[state.userID][state.currentCategory].bookmarkorder, bookmarkId],
                            order:[...state.categories[state.userID][state.currentCategory].order, bookmarkOrderLength],
                            categoryloc:[...state.categories[state.userID][state.currentCategory].categoryloc, 0],
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
                        category: action.bookmarkjson.category,
                        userid:action.bookmarkjson.userid,
                        orderid:action.bookmarkjson.orderid
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
                            ...state.categories[state.userID],
                            {
                                id:action.categoryjson.id,
                                name:action.categoryjson.name,
                                parent:action.categoryjson.parents,
                                children: action.categoryjson.children,
                                bookmarkorder: action.categoryjson.bookmarkorder,
                                categoryloc: action.categoryjson.categoryloc,
                                order: action.categoryjson.order,
                                userid: action.categoryjson.userid,
                                orderid: action.categoryjson.orderid
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
                                categoryloc:[...state.categories[state.userID][state.currentCategory].categoryloc, 1]
                            },
                            ...state.categories[state.userID].slice(state.currentCategory+1),
                            {
                                id:action.categoryjson.id,
                                name:action.categoryjson.name,
                                parent:action.categoryjson.parents,
                                children: action.categoryjson.children,
                                bookmarkorder: action.categoryjson.bookmarkorder,
                                categoryloc: action.categoryjson.categoryloc,
                                order: action.categoryjson.order,
                                userid: action.categoryjson.userid,
                                orderid: action.categoryjson.orderid
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
                            categoryloc: newCategoryLoc
                        },
                        ...state.categories[state.userID].slice(state.currentCategory+1)
                    ]
                }
            }
            

        case TOGGLE_EDIT:
            if (state.edit==="edit-display") {
                return {
                    ...state,
                    edit: "",
                    editBool: false
                }
            } else {
                return {
                    ...state,
                    edit:"edit-display",
                    editBool: true
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
                },
                history: [],
                currentOrderID: 1,
                newBookmarkPopup: false,
                editBookmark: false,
                editCategory: false
            }

        case HYDRATE_BOOKMARKS_STATE:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    [state.userID] : [
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
                        ...action.categoriesArray
                    ]
                },
                currentOrderID: action.categoriesArray.length + state.bookmarks[state.userID].length+100
            }

        case UPDATE_CURRENT_ORDER_ID:
            return {
                ...state,
                currentOrderID: state.categories[state.userID][state.currentCategory].order.length+1
            }

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                history: [
                    ...state.history,
                    state.currentCategory
                ],
                currentCategory: action.updateCurrentCategory
            }

        case GO_BACK:
            let historyLength = state.history.length
            return {
                ...state,
                currentCategory: state.history[historyLength-1],
                history: [
                    ...state.history.slice(0,historyLength-1)
                ]

            }

        case REMOVE_CATEGORY_FROM_STATE:
            historyLength = state.history.length
            let parentCategory = state.history[historyLength-1]
            if (state.categories[state.userID][parentCategory].categoryloc.length === 1) {
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        [state.userID] : [
                            ...state.categories[state.userID].slice(0,parentCategory),
                            {
                                ...state.categories[state.userID][parentCategory],
                                children: [],
                                order: [],
                                categoryloc: []
                            },
                            ...state.categories[state.userID].slice(parentCategory+1,state.currentCategory),
                            ...state.categories[state.userID].slice(state.currentCategory+1)
                        ]
                    },
                    currentCategory: 0,
                    history: []
                }
            } else {
                var childrenIndex = findIndex(state.categories[state.userID][parentCategory].children,action.id)
                var orderIndex = findCategoryOrderIndex(state.categories[state.userID][parentCategory].order,childrenIndex,state.categories[state.userID][parentCategory].categoryloc )
                let newCategoryOrder = []
                for (let i=0; i< state.categories[state.userID][parentCategory].order.length; i++) {
                    if (state.categories[state.userID][parentCategory].categoryloc[i]===1) {
                        if (state.categories[state.userID][parentCategory].order[i] > childrenIndex) {
                            newCategoryOrder.push(state.categories[state.userID][parentCategory].order[i]-1)
                        } else if (state.categories[state.userID][parentCategory].order[i]< childrenIndex) {
                            newCategoryOrder.push(state.categories[state.userID][parentCategory].order[i])
                        }
                    } else {
                        newCategoryOrder.push(state.categories[state.userID][parentCategory].order[i])
                    }
                }
                let newChildrenOrder = []
                for (let i=0; i< state.categories[state.userID][parentCategory].children.length; i++) {
                    if (state.categories[state.userID][parentCategory].children[i] > action.id) {
                        newChildrenOrder.push(state.categories[state.userID][parentCategory].children[i]-1)
                    } else if (state.categories[state.userID][parentCategory].children[i]< action.id) {
                        newChildrenOrder.push(state.categories[state.userID][parentCategory].children[i])
                    }
                }

            var newCategories=[];
            let newChildren=[];
            let counter=0;
            for (let i=parentCategory+1; i< state.categories[state.userID].length; i++) {
                if (i===state.currentCategory) {
                    continue
                }
                for (let j =0; j< state.categories[state.userID][i].children.length; j++) {
                    newChildren.push(state.categories[state.userID][i].children[j]-1)
                }
                newCategories.push(state.categories[state.userID][i])
                newCategories[counter].children=newChildren
                newChildren=[]
                counter++
            }

                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        [state.userID] : [
                            ...state.categories[state.userID].slice(0,parentCategory),
                            {
                                ...state.categories[state.userID][parentCategory],
                                children: newChildrenOrder,
                                order: newCategoryOrder,
                                categoryloc: [
                                    ...state.categories[state.userID][parentCategory].categoryloc.slice(0,orderIndex),
                                    ...state.categories[state.userID][parentCategory].categoryloc.slice(orderIndex+1)
                                ]

                            },
                            ...newCategories
                            // ...state.categories[state.userID].slice(parentCategory+1,state.currentCategory),
                            // ...state.categories[state.userID].slice(state.currentCategory+1)

                        ]
                    },
                    currentCategory: state.history[historyLength-1],
                    history: [
                        ...state.history.slice(0,historyLength-1)
                    ]
                }
        }

        case REMOVE_BOOKMARK_FROM_STATE:
            let counteri = -1;
            let locIndex = 0;
            for (let i=0; i<state.categories[state.userID][state.currentCategory].categoryloc.length; i++) {
                if (state.categories[state.userID][state.currentCategory].categoryloc[i]===0) {
                    counteri += 1
                    if (action.id===counteri) {
                        locIndex = state.categories[state.userID][state.currentCategory].order[i]
                    }
                }
            }
            let bookmarkIndex = state.categories[state.userID][state.currentCategory].bookmarkorder[locIndex]
            console.log(bookmarkIndex)
            // let bookmarkCategory = state.bookmarks[state.userID][action.id].category
            var bookmarkChildrenIndex = findIndex(state.categories[state.userID][state.currentCategory].bookmarkorder,bookmarkIndex)
            orderIndex = findBookmarkOrderIndex(state.categories[state.userID][state.currentCategory].order,bookmarkChildrenIndex,state.categories[state.userID][state.currentCategory].categoryloc )
            newOrder =  []
            for (let i=0; i< state.categories[state.userID][state.currentCategory].order.length; i++) {
                if (state.categories[state.userID][state.currentCategory].categoryloc[i]===0) {
                    if (state.categories[state.userID][state.currentCategory].order[i] > bookmarkChildrenIndex) {
                        newOrder.push(state.categories[state.userID][state.currentCategory].order[i]-1)
                    } else if (state.categories[state.userID][state.currentCategory].order[i]< bookmarkChildrenIndex) {
                        newOrder.push(state.categories[state.userID][state.currentCategory].order[i])
                    }
                } else {
                    newOrder.push(state.categories[state.userID][state.currentCategory].order[i])
                }
            }
            let newBookmarkOrder = []
            for (let i=0; i< state.categories[state.userID][state.currentCategory].bookmarkorder.length; i++) {
                if (state.categories[state.userID][state.currentCategory].bookmarkorder[i] > bookmarkIndex) {
                    newBookmarkOrder.push(state.categories[state.userID][state.currentCategory].bookmarkorder[i]-1)
                } else if (state.categories[state.userID][state.currentCategory].bookmarkorder[i]< bookmarkIndex) {
                    newBookmarkOrder.push(state.categories[state.userID][state.currentCategory].bookmarkorder[i])
                }
            }

            newCategories=[];
            let newChildren=[];
            let counter=0;
            for (let i=state.currentCategory+1; i< state.categories[state.userID].length; i++) {
                if (i===state.currentCategory) {
                    continue
                }
                for (let j =0; j< state.categories[state.userID][i].bookmarkorder.length; j++) {
                    newChildren.push(state.categories[state.userID][i].bookmarkorder[j]-1)
                }
                newCategories.push(state.categories[state.userID][i])
                newCategories[counter].children=newChildren
                newChildren=[]
                counter++
            }
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [state.userID] : [
                        ...state.categories[state.userID].slice(0,state.currentCategory),
                        {
                            ...state.categories[state.userID][state.currentCategory],
                            bookmarkorder: newBookmarkOrder,
                            order: newOrder,
                            categoryloc: [
                                ...state.categories[state.userID][state.currentCategory].categoryloc.slice(0,orderIndex),
                                ...state.categories[state.userID][state.currentCategory].categoryloc.slice(orderIndex+1)
                            ]

                        },
                        ...newCategories
                    ]
                },
                bookmarks: {
                    ...state.bookmarks,
                    [state.userID]: [
                        ...state.bookmarks[state.userID].slice(0,bookmarkIndex),
                        ...state.bookmarks[state.userID].slice(bookmarkIndex+1)
                        
                    ]
                }
            }

        case BOOKMARK_JUST_DELETED:
            return {
                ...state,
                bookmarkWasJustDeleted: action.bool
            }

        case TOGGLE_EDIT_BOOKMARK:
            return {
                ...state,
                editBookmark: action.bool,
                bookmarkToEdit: {
                    ...state.bookmarkToEdit,
                    id: action.id,
                    title: action.title,
                    about: action.about,
                    link: action.link,
                    index: action.index
                }
            }

        case TOGGLE_EDIT_CATEGORY:
            return {
                ...state,
                editCategory: action.bool
            }

        case NEW_CATEGORY_INFO:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [state.userID] : [
                        ...state.categories[state.userID].slice(0,state.currentCategory),
                        {
                            ...state.categories[state.userID][state.currentCategory],
                            name: action.name
                        },
                        ...state.categories[state.userID].slice(state.currentCategory+1)
                    ]
                }
            }

        case NEW_BOOKMARK_INFO:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    [state.userID] : [
                        ...state.bookmarks[state.userID].slice(0, action.index),
                        {
                            ...state.bookmarks[state.userID][action.index],
                            title: action.title,
                            about: action.about,
                            link: action.link
                        },
                        ...state.bookmarks[state.userID].slice(action.index+1)
                    ]
                }
            }
    }
}

function findIndex(array,id) {
    for (var index=0; index < array.length; index++) {
        if (array[index] === id) {
            break
        }
    }
    return index
}

function findCategoryOrderIndex(array,id,categoryloc) {
    for (var index=0; index < array.length; index++) {
        if (array[index] === id) {
            if (categoryloc[index]===0) {
                continue
            } else {
                break
            }
        }
    }
    return index
}

function findBookmarkOrderIndex(array,id,categoryloc) {
    for (var index=0; index < array.length; index++) {
        if (array[index] === id) {
            if (categoryloc[index]===1) {
                continue
            } else {
                break
            }
        }
    }
    return index
}