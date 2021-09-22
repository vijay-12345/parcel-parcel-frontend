import { combineReducers } from 'redux';
import login from './login_reducer'
import common from './vindima_secondScreen_reducer'



export default combineReducers({
    login,
    common
});