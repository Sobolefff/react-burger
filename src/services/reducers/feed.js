import {
    SELECT_ORDER,
    SET_CORRECT_ORDERS,
    SET_DONE_ORDERS,
} from '../actions/feed';

const initialState = {
    orders: [],
    currentOrder: null,
    isModalOpen: false,
    isOrderInfoOpen: false,
    done: [],
    inProgress: [],
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CORRECT_ORDERS: {
            return {
                ...state,
                orders: action.payload,
            };
        }
        case SET_DONE_ORDERS: {
            return {
                ...state,
                done: action.payload.done,
                inProgress: action.payload.inProgress,
            };
        }
        case SELECT_ORDER: {
            return {
                ...state,
                currentOrder: action.payload,
                isOrderInfoOpen: true,
            };
        }
        default: {
            return state;
        }
    }
};
