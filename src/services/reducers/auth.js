import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGIN_WITH_TOKEN} from "../actions/auth";

export const initialState = {
    token: '',
    isAuthenticated: false,
    isLoggingIn: false,
    hasError: {error: false, message: ''}
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, isLoggingIn: true};
        }

        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.payload.message.token);
            return {...state, isLoggingIn: false, isAuthenticated: true, token: action.payload.message.token, hasError: {error: false, message: ''}};
        }

        case LOGIN_FAILED: {
            return {...state, isLoggingIn: false, hasError: {error: true, message: action.payload}}
        }

        case LOGIN_WITH_TOKEN: {
            return {...state, isAuthenticated: true, token: action.token};
        }

        case LOGOUT: {
            localStorage.removeItem('token');
            return {...initialState}
        }

        default: {
            return {...state};
        }
    }
};