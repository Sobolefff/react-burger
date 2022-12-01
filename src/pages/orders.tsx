import React from 'react';
import styles from './feed.module.css';
import { OrderCard } from '../components/order-card/order-card';
import {
    wsConnectionStartAction,
    wsConnectionClosedAction,
} from '../services/actions/ws';
import { useDispatch, useSelector } from '../services/store';
import { useEffect, FC } from 'react';
import { getCookie } from '../services/actions/auth';

export const Orders: FC = () => {
    const dispatch = useDispatch();
    const token = getCookie('tokenn');
    const wsUrl = `wss://norma.nomoreparties.space/orders?token=${token}`;
    let { orders } = useSelector((state) => state.ws);
    const reversedorders = [...orders!.orders].reverse();

    useEffect(() => {
        dispatch(wsConnectionStartAction(wsUrl));
        return () => {
            dispatch(wsConnectionClosedAction());
        };
    }, [dispatch]);

    return (
        orders && (
            <ul className={styles.list}>
                {reversedorders.map((order) => (
                    <OrderCard order={order} key={order._id} />
                ))}
            </ul>
        )
    );
};
