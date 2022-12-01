import React, { FC } from 'react';
import { useSelector } from '../services/store';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import styles from './home.module.css';

export const HomePage: FC = () => {
    const isLoading = useSelector((store) => store.ingredients.isLoading);

    return (
        <main className={`${styles.main} pl-5`}>
            {!isLoading && (
                <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </>
            )}
        </main>
    );
};
