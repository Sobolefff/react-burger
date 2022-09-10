import { combineReducers } from 'redux';
import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED, 
    GET_ORDERNUM_REQUEST,
    GET_ORDERNUM_SUCCESS,
    GET_ORDERNUM_FAILED,
    CURRENT_INGREDIENT_OPENED,
    CURRENT_INGREDIENT_CLOSED,
    GET_TOTALPRICE
} from '../actions/index';

const initialState = {
    data: [],
    constructorData: {
        bun: [],
        content: [],
    },
    currentIngredientDetails: {
        image: null,
        name: null,
        calories: null,
        proteins: null,
        fat: null,
        carbohydrates: null
    },
    isModalOpen: false,
    dataRequest: false,
    dataFailed: false,
    orderNumRequest: false,
    orderNumFailed: false,
    currentIngredient: {},
    order: '',
    totalPrice: '',
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
                    content: action.data.filter((el) => el.type !== "bun")
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
        case GET_ORDERNUM_REQUEST: {
            return {
                ...state,
                orderNumRequest: true
            }
        }
        case GET_ORDERNUM_SUCCESS: {
            return {
                ...state,
                order: action.orderNum,
                orderNumRequest: false,
                orderNumFailed: false,
            }
        }
        case GET_ORDERNUM_FAILED: {
            return {
                ...state,
                orderNumRequest: false,
                orderNumFailed: true,
            }
        }
        case GET_TOTALPRICE: {
            return {
                ...state,
                totalPrice: action.totalPrice
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const openIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_INGREDIENT_OPENED: {
            return {
                ...state,
                isModalOpen: true,
                currentIngredientDetails: {
                image: action.payload.image,
                name: action.payload.name,
                calories: action.payload.calories,
                proteins: action.payload.proteins,
                fat: action.payload.fat,
                carbohydrates: action.payload.carbohydrates,
                }
            };
        }
        case CURRENT_INGREDIENT_CLOSED: {
            return {
                ...state,
                isModalOpen: false,
                currentIngredientDetails: {
                    image: null,
                    name: null,
                    calories: null,
                    proteins: null,
                    fat: null,
                    carbohydrates: null,
                }
            }
        }
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    ingredients: mainReducer,
    details: openIngredientReducer
});