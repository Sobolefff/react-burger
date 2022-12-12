import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USERINFO_REQUEST,
    GET_USERINFO_SUCCESS,
    GET_USERINFO_FAILED,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    SAVE_PASSWORD_REQUEST,
    SAVE_PASSWORD_SUCCESS,
    SAVE_PASSWORD_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILED,
    AUTH_CHECKED,
} from '../actions/auth';

import { TApplicationActions } from '../store';

type TProfileForm = {
    name: string;
    email: string;
    password: string;
};

type TInitialUserState = {
    user: TProfileForm;
    isLoading: boolean;
    hasError: boolean;
    isUserAuthorized: boolean;
    isAuthChecked: boolean;
    isTokenUpdated: boolean;
    isForgotPassword: boolean;
};

const initialUserState: TInitialUserState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLoading: false,
    hasError: false,
    isUserAuthorized: false,
    isAuthChecked: false,
    isTokenUpdated: false,
    isForgotPassword: false,
};

export const userReducer = (
    state = initialUserState,
    action: TApplicationActions
): TInitialUserState => {
    switch (action.type) {
        case AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: true,
            };
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                isUserAuthorized: true,
                user: {
                    name: action.user.name,
                    email: action.user.email,
                    password: action.user.password,
                },
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isUserAuthorized: true,
                user: {
                    ...state.user,
                    email: action.user.email,
                    name: action.user.name,
                    password: action.user.password,
                },
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        case GET_USERINFO_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_USERINFO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    name: action.user.name,
                    email: action.user.email,
                    password: action.user.password,
                },
                isUserAuthorized: true,
            };
        }
        case GET_USERINFO_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isTokenUpdated: true,
            };
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isForgotPassword: true,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isForgotPassword: true,
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                isLoading: false,
                isForgotPassword: false,
                hasError: true,
            };
        }
        case SAVE_PASSWORD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isForgotPassword: false,
            };
        }
        case SAVE_PASSWORD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case SAVE_PASSWORD_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isUserAuthorized: false,
                user: {
                    ...state.user,
                    email: '',
                    name: '',
                    password: '',
                },
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        case UPDATE_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case UPDATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    name: action.user.name,
                    email: action.user.email,
                },
            };
        }
        case UPDATE_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        }
        default: {
            return state;
        }
    }
};
