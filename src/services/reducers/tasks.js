import {
    GET_TASKSLIST_REQUEST,
    GET_TASKSLIST_SUCCESS,
    GET_TASKSLIST_FAILED,
    SET_PAGE,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    EDIT_TASK_REQUEST,
    EDIT_TASK_SUCCESS
} from "../actions/tasks";

export const initialState = {
    tasks: [],
    fullTasksCount: 0,
    currentPage: 1,
    isLoadingTasks: false,
    hasErrorTasks: false,
    isCreatingTask: false,
    isEditingTask: false
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
            return {...state, isCreatingTask: true};
        }

        case CREATE_TASK_SUCCESS: {
            return {...state, isCreatingTask: false};
        }

        case EDIT_TASK_REQUEST: {
            return {...state, isEditingTask: true};
        }

        case EDIT_TASK_SUCCESS: {
            return {...state, isEditingTask: false};
        }

        default: {
            return {...state};
        }
    }
}