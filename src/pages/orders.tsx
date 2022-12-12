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
import { WS_BASE_URL } from '../utils/constants';

export const Orders: FC = () => {
    const dispatch = useDispatch();
    const token = getCookie('tokenn');
    let { orders } = useSelector((state) => state.ws);
    const reversedorders = [...orders!.orders].reverse();

    useEffect(() => {
        dispatch(wsConnectionStartAction(`${WS_BASE_URL}?token=${token}`));
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
