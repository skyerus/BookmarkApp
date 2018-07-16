import {REORDER_BOOKMARKS} from '../actions/types';

const initialState = {
    bookmarks: [
        {
            id:0,
            title: "Bookmark "          
        },
        {
            id:1,
            title: "Bookmark "
        },
        {
            id:2,
            title: "Bookmark "
        },
        {
            id:3,
            title: "Bookmark "
        },
        {
            id:4,
            title: "Bookmark "
        }
    ],
    order: [2,3,0,1,4]
}

function reorderIndex(newIndex,receivedIndex,state) {
    let newOrder = state.order.slice(0)
    let placed = false
    if (newIndex < receivedIndex){
        for (let i=0;i<state.order.length;i++) {
            if (placed){
                if (i>receivedIndex){
                    break
                } else {
                    newOrder[i]=state.order[i-1]
                }
            } else if (i===newIndex) {
                newOrder[i]=state.order[receivedIndex]
                placed=true
            } else {
                newOrder[i] = state.order[i]
            }
        }
    } else {
        for (let i=state.order.length-1;i>=0;i--) {
            if (placed){
                if (i<receivedIndex){
                    break
                } else {
                    newOrder[i]=state.order[i+1]
                }
            } else if (i===newIndex) {
                newOrder[i]=state.order[receivedIndex]
                placed=true
            } else {
                newOrder[i] = state.order[i]
            }
        }
    } return newOrder

}

export default function(state = initialState, action) {
    switch(action.type)
    {
        default:
            return state;

        case REORDER_BOOKMARKS:
            let newOrder = reorderIndex(action.payload[0],action.payload[1],state)
            
            return {
                ...state,
                order: newOrder
            }


    }
}