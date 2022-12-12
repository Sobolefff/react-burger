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

import {
    ILoginRequest,
    ILoginSuccess,
    ILoginFailed,
    ILogoutRequest,
    ILogoutSuccess,
    ILogoutFailed,
    IUpdateRequest,
    IUpdateSuccess,
    IUpdateFailed,
    IRegisterRequest,
    IRegisterSuccess,
    IRegisterFailed,
    IGetUserInfoRequest,
    IGetUserInfoSuccess,
    IGetUserInfoFailed,
    IAuthChecked,
    IRefreshTokenRequest,
    IRefreshTokenSuccess,
    IRefreshTokenFailed,
    IResetPasswordRequest,
    IResetPasswordSuccess,
    IResetPasswordFailed,
    ISavePasswordRequest,
    ISavePasswordSuccess,
    ISavePasswordFailed,
    AppThunk,
    TUser,
} from '../store';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const GET_USERINFO_REQUEST: 'GET_USERINFO_REQUEST' =
    'GET_USERINFO_REQUEST';
export const GET_USERINFO_SUCCESS: 'GET_USERINFO_SUCCESS' =
    'GET_USERINFO_SUCCESS';
export const GET_USERINFO_FAILED: 'GET_USERINFO_FAILED' = 'GET_USERINFO_FAILED';
export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' =
    'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' =
    'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' =
    'REFRESH_TOKEN_FAILED';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' =
    'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' =
    'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' =
    'RESET_PASSWORD_FAILED';
export const SAVE_PASSWORD_REQUEST: 'SAVE_PASSWORD_REQUEST' =
    'SAVE_PASSWORD_REQUEST';
export const SAVE_PASSWORD_SUCCESS: 'SAVE_PASSWORD_SUCCESS' =
    'SAVE_PASSWORD_SUCCESS';
export const SAVE_PASSWORD_FAILED: 'SAVE_PASSWORD_FAILED' =
    'SAVE_PASSWORD_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const UPDATE_REQUEST: 'UPDATE_REQUEST' = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS: 'UPDATE_SUCCESS' = 'UPDATE_SUCCESS';
export const UPDATE_FAILED: 'UPDATE_FAILED' = 'UPDATE_FAILED';
export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

const loginRequest = (): ILoginRequest => ({
    type: LOGIN_REQUEST,
});

const loginSuccess = (user: TUser): ILoginSuccess => ({
    type: LOGIN_SUCCESS,
    user,
});

const loginFailed = (): ILoginFailed => ({
    type: LOGIN_FAILED,
});

const logoutRequest = (): ILogoutRequest => ({
    type: LOGOUT_REQUEST,
});

const logoutSuccess = (): ILogoutSuccess => ({
    type: LOGOUT_SUCCESS,
});

const logoutFailed = (): ILogoutFailed => ({
    type: LOGOUT_FAILED,
});

const updateRequest = (): IUpdateRequest => ({
    type: UPDATE_REQUEST,
});

const updateSuccess = (user: TUser): IUpdateSuccess => ({
    type: UPDATE_SUCCESS,
    user,
});

const updateFailed = (): IUpdateFailed => ({
    type: UPDATE_FAILED,
});

const registerRequest = (): IRegisterRequest => ({
    type: REGISTER_REQUEST,
});

const registerSuccess = (user: TUser): IRegisterSuccess => ({
    type: REGISTER_SUCCESS,
    user,
});

const registerFailed = (): IRegisterFailed => ({
    type: REGISTER_FAILED,
});

const getUserInfoRequest = (): IGetUserInfoRequest => ({
    type: GET_USERINFO_REQUEST,
});

const getUserInfoSuccess = (user: TUser): IGetUserInfoSuccess => ({
    type: GET_USERINFO_SUCCESS,
    user,
});

const getUserInfoFailed = (): IGetUserInfoFailed => ({
    type: GET_USERINFO_FAILED,
});

const checkAuth = (): IAuthChecked => ({
    type: AUTH_CHECKED,
});

const refreshTokenRequest = (): IRefreshTokenRequest => ({
    type: REFRESH_TOKEN_REQUEST,
});

const refreshTokenSuccess = (): IRefreshTokenSuccess => ({
    type: REFRESH_TOKEN_SUCCESS,
});

const refreshTokenFailed = (): IRefreshTokenFailed => ({
    type: REFRESH_TOKEN_FAILED,
});

const resetPasswordRequest = (): IResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST,
});

const resetPasswordSuccess = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
});

const resetPasswordFailed = (): IResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED,
});

const savePasswordRequest = (): ISavePasswordRequest => ({
    type: SAVE_PASSWORD_REQUEST,
});

const savePasswordSuccess = (): ISavePasswordSuccess => ({
    type: SAVE_PASSWORD_SUCCESS,
});

const savePasswordFailed = (): ISavePasswordFailed => ({
    type: SAVE_PASSWORD_FAILED,
});

export function setCookie(
    name: string,
    value: string | number | boolean,
    props: any
) {
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

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

export const loginUser: AppThunk =
    (email: string, password: string) => (dispatch) => {
        dispatch(loginRequest());
        apiLoginUser(email, password).then((res) => {
            if (res && res.success) {
                dispatch(loginSuccess(res.user));
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('tokenn', accessToken, {});
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                dispatch(loginFailed());
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

export const registerUser: AppThunk =
    (name: string, email: string, password: string, redirectFunc: () => void) =>
    (dispatch) => {
        dispatch(registerRequest());
        apiRegisterUser(name, email, password).then((res) => {
            if (res.success) {
                dispatch(registerSuccess(res.user));
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('tokenn', accessToken, {});
                localStorage.setItem('refreshToken', refreshToken);
                redirectFunc();
            } else {
                dispatch(registerFailed());
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

export const refreshTokenAction: AppThunk = () => (dispatch) => {
    dispatch(refreshTokenRequest());
    apiRefreshToken(localStorage.getItem('refreshToken')!)
        .then((res) => {
            if (res && res.success) {

                const accessToken = res.accessToken.split('Bearer ')[1];

                deleteCookie('tokenn');
                localStorage.removeItem('refreshToken');

                setCookie('tokenn', accessToken, {});
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch(refreshTokenSuccess());
            } else {
                dispatch(refreshTokenFailed());
            }
            return res;
        })
        .then((fin) => {
            return fetch(`${apiConfig.baseURL}auth/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('tokenn'),
                },
            });
        })
        .then((res) => checkResponse(res))
        .finally(() => {
            dispatch(checkAuth());
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getUserInfo: AppThunk = () => (dispatch) => {
    dispatch(getUserInfoRequest());
    apiUserRequest()
        .then((res) => {
            if (res && res.success) {
                dispatch(getUserInfoSuccess(res.user));
            } else {
                dispatch(getUserInfoFailed());
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(checkAuth());
        });
};

export const updateUser: AppThunk =
    (email: string, name: string) => (dispatch) => {
        dispatch(updateRequest());
        apiUpdateUser(email, name)
            .then((res) => {
                if (res && res.success) {
                    dispatch(updateSuccess(res.user));
                } else {
                    dispatch(updateFailed());
                }
                return res;
            })
            .catch((err) => {
                if (err === 'Ошибка: 403') {
                    dispatch(refreshTokenAction());
                }
            })
            .finally(() => {
                dispatch(checkAuth());
            });
    };

export const logoutUser: AppThunk = () => (dispatch) => {
    dispatch(logoutRequest());
    apiLogoutUser(localStorage.getItem('refreshToken')!)
        .then((res) => {
            if (res && res.success) {
                dispatch(logoutSuccess());
                deleteCookie('tokenn');
                localStorage.removeItem('refreshToken');
            } else {
                dispatch(logoutFailed());
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export const resetPassword: AppThunk =
    (email: string, redirectFunc: () => void) => (dispatch) => {
        dispatch(resetPasswordRequest());
        apiPasswordReset(email)
            .then((res) => {
                if (res && res.success) {
                    dispatch(resetPasswordSuccess());
                    redirectFunc();
                } else {
                    dispatch(resetPasswordFailed());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

export const savePassword: AppThunk =
    (password: string, code: string, redirectFunc: () => void) =>
    (dispatch) => {
        dispatch(savePasswordRequest());
        apiPasswordSave(password, code)
            .then((res) => {
                if (res && res.success) {
                    dispatch(savePasswordSuccess());
                    redirectFunc();
                } else {
                    dispatch(savePasswordFailed());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
