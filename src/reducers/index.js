import { combineReducers} from 'redux';
import loginSignupReducer from './loginSignupReducer';
import bookmarksReducer from './bookmarksReducer';

export default combineReducers({
    LoginSignup: loginSignupReducer,
    Bookmarks: bookmarksReducer
})