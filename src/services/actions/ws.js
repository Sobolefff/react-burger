export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_ORDER = 'WS_SEND_ORDER';

export const wsConnectionStartAction = (wsUrl) => {
    return {
        type: WS_CONNECTION_START,
        wsUrl,
    };
};

export const wsConnectionSuccessAction = () => {
    return {
        type: WS_CONNECTION_SUCCESS,
    };
};

export const wsConnectionErrorAction = (error) => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: error,
    };
};

export const wsConnectionClosedAction = () => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};

export const wsConnectionGetOrdersAction = (orders) => {
    return {
        type: WS_GET_ORDERS,
        payload: orders,
    };
};

export const wsConnectionSendOrderAction = (order) => {
    return {
        type: WS_SEND_ORDER,
        payload: order,
    };
};
