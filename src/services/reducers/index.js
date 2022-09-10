import { combineReducers } from 'redux';
import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED 
} from '../actions/index';

const initialState = {
    data: [],
    constructorData: {
        bun: [],
        content: [],
        count: {},
    },
    dataRequest: false,
    dataFailed: false,
    currentIngredient: {},
    order: {},
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                dataRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                dataFailed: false,
                data: action.data,
                constructorData: {
                    bun: action.data.filter((el) => el.type === "bun")[0],
                    content: Array.from(action.data.filter((el) => el.type !== "bun"))
                },
                dataRequest: false,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                dataFailed: true,
                dataRequest: false
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const rootReducer = combineReducers({
    ingredients: mainReducer
});