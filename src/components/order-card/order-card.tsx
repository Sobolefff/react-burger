import React, { FC } from 'react';
import styles from './order-card.module.css';
import { useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectOrderAction } from '../../services/actions/feed';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { editDate } from '../../utils/functions';
import { TOrderCardProps } from '../../utils/types';

export const OrderCard: FC<TOrderCardProps> = (props: TOrderCardProps) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { url } = useRouteMatch();
    const data = useSelector((store) => store.ingredients.data);

    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [images, setImages] = useState<Array<string>>([]);

    const imageQuantity = 5;
    const dateString = editDate(props.order?.createdAt);
    const select = () => dispatch(selectOrderAction(props.order));

    let ingrData;

    useEffect(() => {
        let bun = false;
        let targetImages: any[] = [];
        let ingredients: Array<any> = props.order.ingredients;
        props.order &&
            ingredients &&
            ingredients.forEach((ingredient) => {
                ingrData = data?.find((el) => el._id === ingredient);
                if (ingredient === null) {
                    return;
                }
                if (ingredient.type === 'bun' && !bun) {
                    bun = true;
                    targetImages.push(ingrData?.image);
                }
                if (ingredient.type !== 'bun') {
                    targetImages.push(ingrData?.image);
                }
            });
        setImages(targetImages);
        setCount(targetImages.length);
    }, [props.order?.ingredients]);

    useEffect(() => {
        if (data.length) {
            let totalPrice = 0;
            let targetIngredients = [];
            let bun = false;
            props.order &&
                props.order.ingredients.forEach((ingredient: string) => {
                    ingrData = data?.find((el) => el._id === ingredient);
                    if (ingrData?.price) {
                        targetIngredients.push(ingrData);
                        if (ingrData.type === 'bun' && !bun) {
                            totalPrice += 2 * ingrData.price;
                            bun = true;
                        }
                        if (ingrData.type !== 'bun')
                            totalPrice += ingrData.price;
                    }
                });
            setPrice(totalPrice);
        }
    }, [data, props.order?.ingredients]);

    return (
        <li className={styles.order} onClick={select} key={props.order?._id}>
            <Link
                className={styles.link}
                to={{
                    pathname: `${url}/${props.order?._id}`,
                    state: { background: location },
                }}
            >
                <div className={styles.orderid}>
                    <p
                        className={`${styles.id} text text_type_digits-default`}
                    >{`#${props.order?.number}`}</p>
                    <p
                        className={`${styles.timestamp} text text_type_main-small text_color_inactive`}
                    >
                        {dateString}
                    </p>
                </div>
                <h3
                    className={`${styles.burgername} text text_type_main-default`}
                >
                    {props.order?.name}
                </h3>
                {url === '/profile/order' && (
                    <p
                        className={`text text_type_main-small ${
                            props.order?.status === 'done' && styles.ready
                        }`}
                    >
                        {props.order?.status === 'created'
                            ? 'Создан'
                            : props.order?.status === 'pending'
                            ? 'Готовится'
                            : 'Выполнен'}
                    </p>
                )}
                <div className={styles.componentandprice}>
                    <div className={styles.ingredients}>
                        {images.map((image, i) => {
                            let left = -i * 15;
                            if (i <= imageQuantity - 1)
                                return (
                                    <div
                                        key={i}
                                        className={styles.container}
                                        style={{ left: left, zIndex: 100 - i }}
                                    >
                                        <img
                                            className={styles.image}
                                            src={image}
                                            alt="Изображение инргедиента"
                                        />
                                    </div>
                                );
                            if (i === imageQuantity)
                                return (
                                    <div
                                        key={i}
                                        className={styles.container}
                                        style={{ left: left, zIndex: 100 - i }}
                                    >
                                        <p
                                            className={
                                                styles.count +
                                                ' text text_type_digits-default'
                                            }
                                        >
                                            {'+' + (count - imageQuantity + 1)}
                                        </p>
                                        <img
                                            className={styles.image}
                                            style={{ opacity: 0.5 }}
                                            src={image}
                                            alt="Изображение инргедиента"
                                        />
                                    </div>
                                );
                            return false;
                        })}
                    </div>
                    <div className={styles.price}>
                        {price > 0 && (
                            <p
                                className={`${styles.digits} text text_type_digits-default`}
                            >
                                {price}
                            </p>
                        )}
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </li>
    );
};
