import { TOrder } from '../../utils/types';
import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLOSE_ORDER_MODAL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    GET_USER_ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,
    GET_USER_ORDER_FAILED,
} from '../actions/order';
import { TOrderActions } from '../actions/order';

export const initialOrderState: TInitialOrderState = {
    isLoading: false,
    hasError: false,
    isModalOpen: false,
    orderRequest: false,
    orderLoaded: false,
    orderFailed: false,
    order: null,
    orders: null,
    currentOrder: null,
    orderNum: 0,
};

export type TInitialOrderState = {
    isLoading: boolean;
    hasError: boolean;
    isModalOpen: boolean;
    orderRequest: boolean;
    orderLoaded: boolean;
    orderFailed: boolean;
    order: TOrder | null;
    orders: Array<TOrder> | null;
    currentOrder: TOrder | null;
    orderNum: number;
};

export const orderReducer = (
    state = initialOrderState,
    action: TOrderActions
): TInitialOrderState => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                isModalOpen: true,
                isLoading: false,
                order: action.order,
                orderNum: action.orderNum,
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                hasError: true,
                isLoading: false,
            };
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                orderLoaded: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                orders: action.orders,
                orderRequest: false,
                orderLoaded: true,
            };
        }
        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }

        case GET_USER_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                orderLoaded: false,
            };
        }
        case GET_USER_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                currentOrder: action.order,
                orderRequest: false,
                orderLoaded: true,
            };
        }
        case GET_USER_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                isModalOpen: false,
            };
        }
        default: {
            return state;
        }
    }
};
