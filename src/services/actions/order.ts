import { apiPostOrder, apiGetOrders, apiGetUserOrder } from '../../utils/api';
import { wsConnectionSendOrderAction } from './ws';
import { AppDispatch } from '../store';
import { TOrder } from '../../utils/types';
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_USER_ORDER_REQUEST: 'GET_USER_ORDER_REQUEST' =
    'GET_USER_ORDER_REQUEST';
export const GET_USER_ORDER_SUCCESS: 'GET_USER_ORDER_SUCCESS' =
    'GET_USER_ORDER_SUCCESS';
export const GET_USER_ORDER_FAILED: 'GET_USER_ORDER_FAILED' =
    'GET_USER_ORDER_FAILED';

export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS;
    order: TOrder;
    orderNum: number;
}

export interface IPostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface ICloseOrderModal {
    readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    orders: Array<TOrder>;
}

export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetUserOrderRequest {
    readonly type: typeof GET_USER_ORDER_REQUEST;
}

export interface IGetUserOrderSuccess {
    readonly type: typeof GET_USER_ORDER_SUCCESS;
    order: TOrder;
}

export interface IGetUserOrderFailed {
    readonly type: typeof GET_USER_ORDER_FAILED;
}

export type TOrderActions =
    | IPostOrderRequest
    | IPostOrderSuccess
    | IPostOrderFailed
    | ICloseOrderModal
    | IGetOrderRequest
    | IGetOrderSuccess
    | IGetOrderFailed
    | IGetUserOrderRequest
    | IGetUserOrderSuccess
    | IGetUserOrderFailed;

const postOrderRequest = (): IPostOrderRequest => ({
    type: POST_ORDER_REQUEST,
});

const postOrderSuccess = (
    order: TOrder,
    orderNum: number
): IPostOrderSuccess => ({
    type: POST_ORDER_SUCCESS,
    order,
    orderNum,
});

const postOrderFailed = (): IPostOrderFailed => ({
    type: POST_ORDER_FAILED,
});

const closeModal = (): ICloseOrderModal => ({
    type: CLOSE_ORDER_MODAL,
});

const getOrderRequest = (): IGetOrderRequest => ({
    type: GET_ORDER_REQUEST,
});

const getOrderSuccess = (orders: Array<TOrder>): IGetOrderSuccess => ({
    type: GET_ORDER_SUCCESS,
    orders,
});

const getOrderFailed = (): IGetOrderFailed => ({
    type: GET_ORDER_FAILED,
});

const getUserOrderRequest = (): IGetUserOrderRequest => ({
    type: GET_USER_ORDER_REQUEST,
});

const getUserOrderSuccess = (order: TOrder): IGetUserOrderSuccess => ({
    type: GET_USER_ORDER_SUCCESS,
    order,
});

const getUserOrderFailed = (): IGetUserOrderFailed => ({
    type: GET_USER_ORDER_FAILED,
});

export const openOrderModal =
    (orderData: string[]) => (dispatch: AppDispatch) => {
        dispatch(postOrderRequest());
        wsConnectionSendOrderAction(orderData);
        apiPostOrder(orderData)
            .then((res) => {
                if (res && res.success) {
                    dispatch(postOrderSuccess(res, res.order.number));
                } else {
                    dispatch(postOrderFailed());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

export const closeOrderModal = () => (dispatch: AppDispatch) => {
    dispatch(closeModal());
};

export const getOrders = () => (dispatch: AppDispatch) => {
    dispatch(getOrderRequest());
    apiGetOrders()
        .then((res) => {
            if (res && res.success) {
                dispatch(getOrderSuccess(res.orders));
            } else {
                dispatch(getOrderFailed());
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch(getOrderFailed());
        });
};

export const getUserOrder = (id: string) => (dispatch: AppDispatch) => {
    dispatch(getUserOrderRequest());
    apiGetUserOrder(id)
        .then((res) => {
            if (res && res.success) {
                dispatch(getUserOrderSuccess(res.orders));
            } else {
                dispatch(getUserOrderFailed());
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch(getUserOrderFailed());
        });
};
