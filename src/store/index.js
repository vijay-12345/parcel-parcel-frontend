import {createStore,applyMiddleware,compose} from 'redux'
import {connectRouter,routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import * as History from 'history';
import rootReducer from './reducers'


export const history = History.createBrowserHistory();


const middleware = [thunk,routerMiddleware(history)]



export default createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(...middleware)
)