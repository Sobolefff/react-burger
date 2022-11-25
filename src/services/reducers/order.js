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

export const initialState = {
    isLoading: false,
    hasError: false,
    isModalOpen: false,
    orderRequest: false,
    orderLoaded: false,
    orderFailed: false,
    order: null,
    orders: null,
    currentOrder: null,
    orderNum: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                orderNum: null,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
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
                order: action.order,
                currentOrder: action.order,
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
