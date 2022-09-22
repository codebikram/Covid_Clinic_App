import { combineReducers } from 'redux';
import loginReducer from './reducers';

let rootReducer = combineReducers({ userState: loginReducer });

export default rootReducer;
