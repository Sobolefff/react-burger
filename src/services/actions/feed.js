export const SELECT_ORDER = 'SELECT_ORDER';
export const SET_CORRECT_ORDERS = 'SET_CORRECT_ORDERS';
export const SET_DONE_ORDERS = 'SET_DONE_ORDERS';
export const UNSELECT_ORDER = 'UNSELECT_ORDER';

export const setCorrectOrdersAction = (orders) => {
    return {
        type: SET_CORRECT_ORDERS,
        payload: orders,
    };
};

export const setDoneOrdersAction = (orders) => {
    return {
        type: SET_DONE_ORDERS,
        payload: orders,
    };
};

export const selectOrderAction = (order) => {
    return {
        type: SELECT_ORDER,
        payload: order,
    };
};
