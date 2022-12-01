import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
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
} from './actions/auth';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_ORDER,
} from './actions/ws';
import { wsMiddleware } from './wsMiddleware';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
    TypedUseSelectorHook,
} from 'react-redux';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const actions = {
    wsStart: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS,
    onSendOrders: WS_SEND_ORDER,
};

const enhancer = composeEnhancers(
    applyMiddleware(thunk, wsMiddleware(actions))
);

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type TUser = {
    name: string;
    email: string;
    password: string;
};

type TLoginActions = ILoginRequest | ILoginSuccess | ILoginFailed;
type TLogoutActions = ILogoutRequest | ILogoutSuccess | ILogoutFailed;
type TUpdateActions = IUpdateRequest | IUpdateSuccess | IUpdateFailed;
type TRegisterActions = IRegisterRequest | IRegisterSuccess | IRegisterFailed;
type TResetPasswordActions =
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed;
type TSavePasswordActions =
    | ISavePasswordRequest
    | ISavePasswordSuccess
    | ISavePasswordFailed;
type TGetUserInfoActions =
    | IGetUserInfoRequest
    | IGetUserInfoSuccess
    | IGetUserInfoFailed;
type TRefreshTokenActions =
    | IRefreshTokenRequest
    | IRefreshTokenSuccess
    | IRefreshTokenFailed;
type TAuthCheckedActions = IAuthChecked;

export type TApplicationActions =
    | TSavePasswordActions
    | TGetUserInfoActions
    | TLoginActions
    | TLogoutActions
    | TUpdateActions
    | TRegisterActions
    | TResetPasswordActions
    | TRefreshTokenActions
    | TAuthCheckedActions
    | TSavePasswordActions;

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    user: TUser;
}
export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    user: TUser;
}
export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED;
}

export interface IGetUserInfoRequest {
    readonly type: typeof GET_USERINFO_REQUEST;
}
export interface IGetUserInfoSuccess {
    readonly type: typeof GET_USERINFO_SUCCESS;
    user: TUser;
}
export interface IGetUserInfoFailed {
    readonly type: typeof GET_USERINFO_FAILED;
}

export interface IRefreshTokenRequest {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccess {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailed {
    readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ISavePasswordRequest {
    readonly type: typeof SAVE_PASSWORD_REQUEST;
}
export interface ISavePasswordSuccess {
    readonly type: typeof SAVE_PASSWORD_SUCCESS;
}
export interface ISavePasswordFailed {
    readonly type: typeof SAVE_PASSWORD_FAILED;
}

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IUpdateRequest {
    readonly type: typeof UPDATE_REQUEST;
}
export interface IUpdateSuccess {
    readonly type: typeof UPDATE_SUCCESS;
    user: TUser;
}
export interface IUpdateFailed {
    readonly type: typeof UPDATE_FAILED;
}

export interface IAuthChecked {
    readonly type: typeof AUTH_CHECKED;
}
