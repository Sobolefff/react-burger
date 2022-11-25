export const wsMiddleware = (actions) => {
    return (store) => {
        let socket = null;

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
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.success) {
                        dispatch({ type: onOrders, payload: data });
                    } else {
                        socket.close();
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
