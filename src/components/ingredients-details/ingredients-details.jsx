import styles from "./ingredients-details.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";

export default function IngredientsDetails(props) {
  return (
    <>
      <img className={styles.image} src={props.image} alt={props.name} />
      <h3 className={`${styles.name} text text_type_main-medium p-0 mt-4 mb-8`}>{props.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{props.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{props.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{props.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{props.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientsDetails.propTypes = ingredientsPropTypes.isRequired;