import {loginRequest} from "../handle-api";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS= 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';

export const login = (data) => {
    return function (dispatch) {
        dispatch({type: LOGIN_REQUEST});

        loginRequest(data).then(result => {
            if (result && result.ok) {
                return result.json();
            }
            else {
                return Promise.reject(`Server error while login: ${result.status}`);
            }
        }).then(data => {
            if (data.status === 'ok') {
                dispatch({type: LOGIN_SUCCESS, payload: data});
            }
            else {
                return Promise.reject(`Server error while login: ${data.status}`);
            }
        }).catch(error => {
            dispatch({type: LOGIN_FAILED, payload: error});
        });
    }
}