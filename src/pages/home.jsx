import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { getIngredients } from '../services/actions';
import styles from './home.module.css';

export function HomePage() {
    const oneFetch = useRef(false);

    const dispatch = useDispatch();
    useEffect(() => { 
        if (oneFetch.current === false) {
        dispatch(getIngredients());
    }
        return () => {
            oneFetch.current = true
        }
    }, [dispatch]);

    const { dataRequest, dataFailed } = useSelector(store => ({
        dataRequest: store.ingredients.dataRequest,
        dataFailed: store.ingredients.dataFailed
    }));

    return (
        <main className={`${styles.main} pl-5`}>
            {dataRequest && "Загрузка..."}
            {dataFailed && "Произошла ошибка"}
            {!dataRequest && !dataFailed && (
            <>
                <BurgerIngredients />
                <BurgerConstructor />
            </>
            )}
        </main>
    )
}