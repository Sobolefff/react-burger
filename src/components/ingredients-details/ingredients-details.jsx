import styles from "./ingredients-details.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import { useSelector } from "react-redux";

export default function IngredientsDetails() {
  const { ingredient } = useSelector(store => ({
    ingredient: store.details.currentIngredientDetails,
  }));


  return (
    <>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
      <h3 className={`${styles.name} text text_type_main-medium p-0 mt-4 mb-8`}>{ingredient.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientsDetails.propTypes = ingredientsPropTypes.isRequired;