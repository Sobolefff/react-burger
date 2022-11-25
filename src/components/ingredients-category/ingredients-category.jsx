import { forwardRef } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "../ingredients-category/ingredients-category.module.css";
import PropTypes from "prop-types";

export const IngredientsCategory = forwardRef(({ title, ingredients, id }, ref) => {
  return (
    <>
      <h2 id={id} className={`${styles.title} text text_type_main-medium mt-10 mb-5`} ref={ref}>
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

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};