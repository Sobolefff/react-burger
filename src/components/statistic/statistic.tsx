import React, { FC } from 'react';
import styles from './statistic.module.css';
import { TStatisticProps } from '../../utils/types';

export const Statistic: FC<TStatisticProps> = (props: TStatisticProps) => {
    return (
        <ul className={styles.list}>
            {props.orders.length > 0 ? (
                props.orders.map((order, index) => (
                    <li key={index}>
                        <p
                            className={`text text_type_digits-default ${styles.element}`}
                        >
                            {order.number}
                        </p>
                    </li>
                ))
            ) : (
                <div></div>
            )}
        </ul>
    );
};
