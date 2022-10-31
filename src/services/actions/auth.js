import {
    apiLoginUser,
    apiRefreshToken,
    apiRegisterUser,
    apiUserRequest,
    apiConfig,
    checkResponse,
    apiUpdateUser,
    apiLogoutUser,
    apiPasswordReset,
    apiPasswordSave,
} from '../../utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const GET_USERINFO_REQUEST = 'GET_USERINFO_REQUEST';
export const GET_USERINFO_SUCCESS = 'GET_USERINFO_SUCCESS';
export const GET_USERINFO_FAILED = 'GET_USERINFO_FAILED';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const SAVE_PASSWORD_REQUEST = 'SAVE_PASSWORD_REQUEST';
export const SAVE_PASSWORD_SUCCESS = 'SAVE_PASSWORD_SUCCESS';
export const SAVE_PASSWORD_FAILED = 'SAVE_PASSWORD_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILED = 'UPDATE_FAILED';
export const AUTH_CHECKED = 'AUTH_CHECKED';

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

export const loginUser = (email, password) => {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });
        apiLoginUser(email, password).then((res) => {
            if (res && res.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    name: res.user.name,
                    email: res.user.email,
                    password: res.user.password,
                });
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, {'max-age': 20});
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                dispatch({
                    type: LOGIN_FAILED,
                });
            }
        });
    };
};

export const registerUser = (name, email, password, redirectFunc) => {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        });
        apiRegisterUser(name, email, password).then((res) => {
            if (res.success) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    name: res.user.name,
                    email: res.user.email,
                });
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, {'max-age': 20});
                localStorage.setItem('refreshToken', refreshToken);
                redirectFunc();
            } else {
                dispatch({
                    type: REGISTER_FAILED,
                });
            }
        });
    };
};

export const refreshTokenAction = () => {
    return function (dispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST,
        });
        apiRefreshToken(localStorage.getItem('refreshToken'))
            .then((res) => {
                if (res && res.success) {
                    const prevRefreshToken =
                        localStorage.getItem('refreshToken');

                    const accessToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;

                    deleteCookie('token');
                    localStorage.removeItem('refreshToken', prevRefreshToken);

                    setCookie('token', accessToken, {'max-age': 20});
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch({
                        type: REFRESH_TOKEN_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: REFRESH_TOKEN_FAILED,
                    });
                }
                return res;
            })
            .then((fin) => {
                return fetch(`${apiConfig.baseURL}auth/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + getCookie('token'),
                    },
                });
            })
            .then(checkResponse)
            .finally(() => {
                dispatch({ type: AUTH_CHECKED });
            });
    };
};

export const getUserInfo = () => {
    return function (dispatch) {
        dispatch({
            type: GET_USERINFO_REQUEST,
        });
        apiUserRequest()
            .catch((err) => {
                if (err === "Ошибка: 403") {
                    dispatch(refreshTokenAction());
                }
                console.log(err)
            })
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USERINFO_SUCCESS,
                        name: res.user.name,
                        email: res.user.email,
                    });
                } else {
                    dispatch({
                        type: GET_USERINFO_FAILED,
                    });
                }
            })
            .finally(() => {
                dispatch({ type: AUTH_CHECKED });
            });
    };
};

export const updateUser = (email, name) => {
    return function (dispatch) {
        dispatch({
            type: UPDATE_REQUEST,
        });
        apiUpdateUser(email, name)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                    });
                } else {
                    dispatch({
                        type: UPDATE_FAILED,
                    });
                }
            })
            .catch((err) => {
                if (err === 'Ошибка: 403') {
                    dispatch(refreshTokenAction());
                }
            })
            .finally((res) => {
                dispatch({ type: AUTH_CHECKED });
            });
    };
};

export const logoutUser = () => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        apiLogoutUser(localStorage.getItem('refreshToken'))
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    });
                    deleteCookie('token');
                    const refreshToken = localStorage.getItem('refreshToken');
                    localStorage.removeItem('refreshToken', refreshToken);
                } else {
                    dispatch({
                        type: LOGOUT_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const resetPassword = (email, redirectFunc) => {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        apiPasswordReset(email)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    });
                    redirectFunc();
                } else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const savePassword = (password, code, redirectFunc) => {
    return function (dispatch) {
        dispatch({
            type: SAVE_PASSWORD_REQUEST,
        });
        apiPasswordSave(password, code)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: SAVE_PASSWORD_SUCCESS,
                    });
                    redirectFunc();
                } else {
                    dispatch({
                        type: SAVE_PASSWORD_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
