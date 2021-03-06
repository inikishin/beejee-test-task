import {
    GET_TASKSLIST_REQUEST,
    GET_TASKSLIST_SUCCESS,
    GET_TASKSLIST_FAILED,
    SET_PAGE,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_CLOSE_ALERT,
    EDIT_TASK_REQUEST,
    EDIT_TASK_SUCCESS,
    EDIT_CLOSE_ALERT
} from "../actions/tasks";

export const initialState = {
    tasks: [],
    fullTasksCount: 0,
    currentPage: 1,
    isLoadingTasks: false,
    hasErrorTasks: false,
    taskCreated: false,
    taskEdited: false
}

export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKSLIST_REQUEST: {
            return {...state, isLoadingTasks: true};
        }

        case GET_TASKSLIST_SUCCESS: {
            return {...state, isLoadingTasks: false, tasks: action.data.tasks, fullTasksCount: action.data.total_task_count};
        }

        case GET_TASKSLIST_FAILED: {
            console.log('Error API: ', action.errorMessage);
            return {...state, isLoadingTasks: false, hasErrorTasks: true}
        }

        case SET_PAGE: {
            return {...state, currentPage: action.page}
        }

        case CREATE_TASK_REQUEST: {
            return {...state, taskCreated: false};
        }

        case CREATE_TASK_SUCCESS: {
            return {...state, taskCreated: true};
        }

        case CREATE_CLOSE_ALERT: {
            return {...state, taskCreated: false};
        }

        case EDIT_TASK_REQUEST: {
            return {...state, taskEdited: false};
        }

        case EDIT_TASK_SUCCESS: {
            return {...state, taskEdited: true};
        }

        case EDIT_CLOSE_ALERT: {
            return {...state, taskEdited: false};
        }

        default: {
            return {...state};
        }
    }
}