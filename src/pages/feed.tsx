import React, { useEffect, FC } from 'react';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../services/store';
import { OrderCard } from '../components/order-card/order-card';
import {
    wsConnectionClosedAction,
    wsConnectionStartAction,
} from '../services/actions/ws';
import { Statistic } from '../components/statistic/statistic';
import { filterOrders } from '../utils/functions';
import { WS_BASE_URL } from '../utils/constants';

export const FeedPage: FC = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector((store) => store.ws);

    const statusArrays = filterOrders(orders!.orders);
    const doneArray = statusArrays?.done.slice(0, 20);
    const pendingArray = statusArrays?.pending.slice(0, 20);

    useEffect(() => {
        dispatch(wsConnectionStartAction(`${WS_BASE_URL}/all`));
        return () => {
            dispatch(wsConnectionClosedAction());
        };
    }, [dispatch]);

    return (
        <section className={styles.wrap}>
            <div className={styles.content}>
                <h2 className={`${styles.title} text text_type_main-large`}>
                    Лента заказов
                </h2>
                <ul className={styles.list}>
                    {orders &&
                        orders.orders.map((order) => (
                            <OrderCard order={order} key={order._id} />
                        ))}
                </ul>
            </div>
            <div className={styles.ordernums}>
                <div className={styles.completed}>
                    <div className={styles.types}>
                        <div className={styles.type}>
                            <p
                                className={`${styles.subtitle} text text_type_main-default`}
                            >
                                Готовы:
                            </p>
                            <Statistic orders={doneArray} />
                        </div>
                        <div className={styles.type}>
                            <p
                                className={`${styles.subtitle} text text_type_main-default`}
                            >
                                В работе:
                            </p>
                            <Statistic orders={pendingArray} />
                        </div>
                    </div>
                </div>
                <div>
                    <p
                        className={`${styles.subtitledone} text text_type_main-default`}
                    >
                        Выполнено за все время:
                    </p>
                    <p
                        className={`${styles.digitslarge} text text_type_digits-large`}
                    >
                        {total}
                    </p>
                </div>
                <div>
                    <p
                        className={`${styles.subtitledone} text text_type_main-default`}
                    >
                        Выполнено за сегодня:
                    </p>
                    <p
                        className={`${styles.digitslarge} text text_type_digits-large`}
                    >
                        {totalToday}
                    </p>
                </div>
            </div>
        </section>
    );
};
