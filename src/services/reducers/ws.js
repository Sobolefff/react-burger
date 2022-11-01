import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_ORDER,
} from '../actions/ws';

export const initialState = {
    wsConnected: false,
    orders: [],

    total: 0,
    totalToday: 0,
    loading: false,
};

export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                loading: true,
            };
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: undefined,
                wsConnected: true,
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
                loading: false,
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                loading: false,
            };
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                error: undefined,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                loading: false,
            };
        }
        case WS_SEND_ORDER: {
            return {
                ...state,
                orders: [...state.orders, action.payload],
            };
        }
        default: {
            return state;
        }
    }
};
