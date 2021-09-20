import {createTaskRequest, editTaskRequest, getTasksListRequest} from "../handle-api";

export const GET_TASKSLIST_REQUEST = 'GET_TASKSLIST_REQUEST';
export const GET_TASKSLIST_SUCCESS= 'GET_TASKSLIST_SUCCESS';
export const GET_TASKSLIST_FAILED = 'GET_TASKSLIST_FAILED';
export const SET_PAGE = 'SET_PAGE';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS= 'CREATE_TASK_SUCCESS';

export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
export const EDIT_TASK_SUCCESS= 'EDIT_TASK_SUCCESS';


export const getTasksList = (page, sortBy, directionBy) => {
    return function (dispatch) {
        dispatch({type: GET_TASKSLIST_REQUEST});

        getTasksListRequest(page, sortBy, directionBy).then((result) => {
            if (result && result.ok) {
                return result.json();
            }
            else {
                return Promise.reject(`Error in request to API: ${result.status}`);
            }
        }).then((data) => {
            if (data.status === 'ok') {
                dispatch({type: GET_TASKSLIST_SUCCESS, data: data.message});
            }
            else {
                return Promise.reject(`Error in response from API: ${data.message}`);
            }
        }).catch((e) => {
            dispatch({type: GET_TASKSLIST_FAILED, errorMessage: e});
        });
    }
}

export const createTask = (task) => {
    return function (dispatch) {
        dispatch({type: CREATE_TASK_REQUEST});

        createTaskRequest(task).then(result => {
            if (result && result.ok) {
                return result.json();
            }
            else {
                console.log('Server error while create task: ', result.status);
            }
        }).then(data => {
            if (data.status === 'ok') {
                dispatch({type: CREATE_TASK_SUCCESS});
            }
            else {
                console.log('Server error while create task: ', data.message);
            }
        });
    }
}

export const editTask = (id, task) => {
    return function (dispatch) {
        dispatch({type: EDIT_TASK_REQUEST});

        editTaskRequest(id, task).then(result => {
            if (result && result.ok) {
                return result.json();
            }
            else {
                console.log('Server error while edit task: ', result.status);
            }
        }).then(data => {
            if (data.status === 'ok') {
                dispatch({type: EDIT_TASK_SUCCESS});
            }
            else {
                console.log('Server error while edit task: ', data.message);
            }
        });
    }
}