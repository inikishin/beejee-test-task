import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from "../actions/auth";

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
            return {...state, isLoggingIn: false, isAuthenticated: true, token: action.payload.message.token, hasError: {error: false, message: ''}};
        }

        case LOGIN_FAILED: {
            return {...state, isLoggingIn: false, hasError: {error: true, message: action.payload}}
        }

        case LOGOUT: {
            return {...initialState}
        }

        default: {
            return {...state};
        }
    }
};