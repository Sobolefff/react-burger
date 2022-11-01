import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    CURRENT_INGREDIENT_OPENED,
    CURRENT_INGREDIENT_CLOSED,
    GET_TOTALPRICE,
    ADD_ITEM,
    ADD_BUN,
    DELETE_ITEM,
    UPDATE_ITEMS,
} from '../actions/index';
import { userReducer } from './auth';
import { feedReducer } from './feed';
import { wsReducer } from './ws';
import { orderReducer } from './order';

const initialState = {
    data: [],
    constructorData: {
        bun: null,
        filling: [],
    },
    currentIngredientDetails: {
        image: null,
        name: null,
        calories: null,
        proteins: null,
        fat: null,
        carbohydrates: null,
    },
    isModalOpen: false,
    dataRequest: false,
    dataFailed: false,
    currentIngredient: {},
    order: null,
    totalPrice: 0,
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                dataRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                dataFailed: false,
                data: action.data,
                dataRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                dataFailed: true,
                dataRequest: false,
            };
        }
        case GET_TOTALPRICE: {
            return {
                ...state,
                totalPrice: action.totalPrice,
            };
        }
        default: {
            return state;
        }
    }
};

export const openIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_INGREDIENT_OPENED: {
            return {
                ...state,
                isModalOpen: true,
                currentIngredientDetails: {
                    ...state.currentIngredientDetails,
                    image: action.payload.image,
                    name: action.payload.name,
                    calories: action.payload.calories,
                    proteins: action.payload.proteins,
                    fat: action.payload.fat,
                    carbohydrates: action.payload.carbohydrates,
                },
            };
        }
        case CURRENT_INGREDIENT_CLOSED: {
            return {
                ...state,
                isModalOpen: false,
                currentIngredientDetails: {
                    ...state.currentIngredientDetails,
                    image: null,
                    name: null,
                    calories: null,
                    proteins: null,
                    fat: null,
                    carbohydrates: null,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            const ingredientSum = state.constructorData.filling.reduce(
                (sum, item) => {
                    if (item._id === action.item._id) {
                        sum++;
                    }
                    return sum;
                },
                1
            );
            return {
                ...state,
                constructorData: {
                    ...state.constructorData,
                    filling: [
                        ...state.constructorData.filling.map((item) => ({
                            ...item,
                        })),
                        ...[
                            {
                                ...action.item,
                                key: action.key,
                                count: ingredientSum,
                            },
                        ],
                    ],
                },
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                constructorData: {
                    ...state.constructorData,
                    bun: { ...action.item, count: 2 },
                },
            };
        }
        case DELETE_ITEM: {
            return {
                ...state,
                constructorData: {
                    ...state.constructorData,
                    filling: state.constructorData.filling
                        .map((item) =>
                            item._id === action.item._id
                                ? { ...item, count: item.count - 1 }
                                : item
                        )
                        .filter((item) => item.count > 0),
                },
            };
        }
        case UPDATE_ITEMS: {
            const filling = [...state.constructorData.filling];
            filling.splice(
                action.toIndex,
                0,
                filling.splice(action.fromIndex, 1)[0]
            );
            return {
                ...state,
                constructorData: {
                    ...state.constructorData,
                    filling: filling,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    ingredients: mainReducer,
    details: openIngredientReducer,
    construct: constructorReducer,
    user: userReducer,
    ord: orderReducer,
    feed: feedReducer,
    ws: wsReducer,
});
