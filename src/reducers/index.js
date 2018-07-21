import { combineReducers} from 'redux';
import loginSignupModalReducer from './loginSignupModalReducer';
import bookmarksReducer from './bookmarksReducer';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';

export default combineReducers({
    LoginSignupModal: loginSignupModalReducer,
    Bookmarks: bookmarksReducer,
    Login: loginReducer,
    SignUp: signUpReducer
})