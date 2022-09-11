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
    GET_TOTALPRICE,
    ADD_ITEM,
    ADD_BUN,
    DELETE_ITEM,
    UPDATE_ITEMS
} from '../actions/index';

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
        carbohydrates: null
    },
    isModalOpen: false,
    dataRequest: false,
    dataFailed: false,
    orderNumRequest: false,
    orderNumFailed: false,
    currentIngredient: {},
    order: null,
    totalPrice: 0,
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
                    ...state.constructorData,
                    bun: action.bun,
                    filling: action.filling
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

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            let ingredientSum = state.constructorData.filling.filter(function(item){return item._id === action.item._id}).length + 1; 
            return {
                ...state,
                constructorData: {
                    ...state.constructorData,
                    filling: 
                    [...state.constructorData.filling.map((item) => 
                        ({...item, added: ingredientSum})),
                        ...[{ ...action.item, added: 1, key: action.key, count: ingredientSum }],
                    ],
                },
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                constructorData: {
                    ...state.constructorData,
                    bun: {...action.item, count: 1}
                }
            }
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
            filling.splice(action.toIndex, 0, filling.splice(action.fromIndex, 1)[0]);
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
}

export const rootReducer = combineReducers({
    ingredients: mainReducer,
    details: openIngredientReducer,
    constructor: constructorReducer,
});

