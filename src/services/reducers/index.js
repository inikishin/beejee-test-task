import {tasks} from "./tasks";
import {auth} from "./auth";
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    tasks: tasks,
    auth: auth
});