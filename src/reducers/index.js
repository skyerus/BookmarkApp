import { combineReducers} from 'redux';
import loginSignupReducer from './loginSignupReducer';

export default combineReducers({
    LoginSignup: loginSignupReducer
})