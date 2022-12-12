import { RootState } from './store';
import { AppDispatch } from './store';
import { Middleware, MiddlewareAPI } from 'redux';
import { TActions } from './actions/ws';

export const wsMiddleware = (actions: TActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload, wsUrl } = action;
            const {
                wsStart,
                onOpen,
                onError,
                onOrders,
                onClose,
                onSendOrders,
            } = actions;

            if (type === wsStart) {
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, error: event });
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.success) {
                        dispatch({ type: onOrders, orders: data });
                    } else {
                        socket?.close();
                    }
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };

                if (type === onClose) {
                    socket.close();
                }

                if (type === onSendOrders) {
                    socket.send(JSON.stringify(payload));
                }
            }
            next(action);
        };
    };
};
