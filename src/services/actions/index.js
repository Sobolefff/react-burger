import { fetchData, apiPostOrder } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_ORDERNUM_REQUEST = 'GET_ORDERNUM_REQUEST';
export const GET_ORDERNUM_SUCCESS = 'GET_ORDERNUM_SUCCESS';
export const GET_ORDERNUM_FAILED = 'GET_ORDERNUM_FAILED';

export const CURRENT_INGREDIENT_OPENED = 'CURRENT_INGREDIENT_OPENED';
export const CURRENT_INGREDIENT_CLOSED = 'CURRENT_INGREDIENT_CLOSED';

export const GET_TOTALPRICE = 'GET_TOTALPRICE';

export const getIngredients = () => {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetchData().then(res => {
            if (res) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: res.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        })
    }
}

export const getOrderNum = (orderData) => {
    return function(dispatch) {
        dispatch({
            type: GET_ORDERNUM_REQUEST
        });
        apiPostOrder(orderData).then(res => {
            if (res) {
                dispatch({
                    type: GET_ORDERNUM_SUCCESS,
                    orderNum: res.order.number
                });
            } else {
                dispatch({
                    type: GET_ORDERNUM_FAILED
                });
            }
        })
    }
}

export const openCurrentIngredient = (props) => {
    return function(dispatch) {
        dispatch({
            type: CURRENT_INGREDIENT_OPENED,
            payload: props
        });
    };
};
export const closeCurrentIngredient = () => {
    return function(dispatch) {
        dispatch({
            type: CURRENT_INGREDIENT_CLOSED,
        })
    }
}

export const getTotalPrice = (bun, content) => {
    let total = 0 + bun.price * 2;
    total = content.reduce(function (acc, obj) { return acc + obj.price; }, total);
    return function(dispatch) {
        dispatch({
            type: GET_TOTALPRICE,
            totalPrice: total
        })
    }
}