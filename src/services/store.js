import { createStore, compose, applyMiddleware } from 'redux';
import { wsMiddleware } from './wsMiddleware';
import { rootReducer } from '../services/reducers/index';
import thunk from 'redux-thunk';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_ORDER,
} from '../services/actions/ws';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const actions = {
    wsStart: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS,
    onSendOrders: WS_SEND_ORDER,
};

const enhancer = composeEnhancers(
    applyMiddleware(thunk, wsMiddleware(actions))
);
export const store = createStore(rootReducer, enhancer);
