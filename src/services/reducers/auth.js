import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from "../actions/auth";

export const initialState = {
    token: '',
    isAuthenticated: false,
    isLoggingIn: false
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, isLoggingIn: true};
        }

        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.payload.message.token);
            return {...state, isLoggingIn: false, isAuthenticated: true, token: action.payload.message.token};
        }

        case LOGIN_FAILED: {
            console.log('Error API: ', action.payload);
            return {...state, token: '', isLoadingTasks: false, hasErrorTasks: false}
        }

        case LOGOUT: {
            return {...state, isAuthenticated: false, token: '', isLoadingTasks: false, hasErrorTasks: false}
        }

        default: {
            return {...state};
        }
    }
};