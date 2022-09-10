import styles from "./ingredients-details.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import { useSelector } from "react-redux";

export default function IngredientsDetails() {
  const {image, name, calories, fat, proteins, carbohydrates} = useSelector(store => ({
    image: store.details.currentIngredientDetails.image,
    name: store.details.currentIngredientDetails.name,
    calories: store.details.currentIngredientDetails.calories,
    proteins: store.details.currentIngredientDetails.proteins,
    fat: store.details.currentIngredientDetails.fat,
    carbohydrates: store.details.currentIngredientDetails.carbohydrates,
  }));


  return (
    <>
      <img className={styles.image} src={image} alt={name} />
      <h3 className={`${styles.name} text text_type_main-medium p-0 mt-4 mb-8`}>{name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{calories}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{fat}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientsDetails.propTypes = ingredientsPropTypes.isRequired;