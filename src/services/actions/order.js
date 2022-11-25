import { apiPostOrder, apiGetOrders, apiGetUserOrder } from '../../utils/api';
import { wsConnectionSendOrderAction } from './ws';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_USER_ORDER_REQUEST = 'GET_USER_ORDER_REQUEST';
export const GET_USER_ORDER_SUCCESS = 'GET_USER_ORDER_SUCCESS';
export const GET_USER_ORDER_FAILED = 'GET_USER_ORDER_FAILED';

export const openOrderModal = (orderData) => {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        });
        wsConnectionSendOrderAction(orderData);
        apiPostOrder(orderData)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        order: res,
                        orderNum: res.order.number,
                    });
                } else {
                    dispatch({
                        type: POST_ORDER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const closeOrderModal = () => {
    return function (dispatch) {
        dispatch({
            type: CLOSE_ORDER_MODAL,
        });
    };
};

export const getOrders = () => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        apiGetOrders()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        orders: res.orders,
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            });
    };
};

export const getUserOrder = (id) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_ORDER_REQUEST,
        });
        apiGetUserOrder(id)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_ORDER_SUCCESS,
                        order: res.orders,
                    });
                } else {
                    dispatch({
                        type: GET_USER_ORDER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_USER_ORDER_FAILED,
                });
            });
    };
};
