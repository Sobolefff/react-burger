import { forwardRef, FC } from 'react';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import styles from '../ingredients-category/ingredients-category.module.css';
import { TIngredientCategoryProps } from '../../utils/types';

export const IngredientsCategory: FC<TIngredientCategoryProps> = forwardRef<
    HTMLInputElement,
    TIngredientCategoryProps
>(({ title, ingredients, id }, ref) => {
    return (
        <>
            <h2
                id={id}
                className={`${styles.title} text text_type_main-medium mt-10 mb-5`}
                ref={ref}
            >
                {title}
            </h2>
            <div className={styles.optionscards}>
                {ingredients.map((ingredient) => (
                    <BurgerIngredient key={ingredient._id} {...ingredient} />
                ))}
            </div>
        </>
    );
});
