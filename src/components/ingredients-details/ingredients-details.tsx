import styles from "./ingredients-details.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { TIngredientDetailsProps } from '../../utils/types';
import { TIngredientData } from '../../utils/types';

export const IngredientsDetails:FC<TIngredientDetailsProps> = (ingrdata:TIngredientDetailsProps) => {
  const [ingr, setIngredient] = useState<TIngredientData>();
  let { id } = useParams<{ id?: string }>();

  useEffect(()=>{
		let currentIngredient = ingrdata && ingrdata.data!.find(el => el._id === id);
    setIngredient(currentIngredient!);
	},[id, ingrdata]);


  return (
    <>
      <img className={styles.image} src={ingr && ingr.image} alt={ingr && ingr.name} />
      <h3 className={`${styles.name} text text_type_main-medium p-0 mt-4 mb-8`}>{ingr && ingr.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingr && ingr.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingr && ingr.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingr && ingr.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={`${styles.component} m-0 p-0 text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.count} p-0 m-0 text text_type_digits-default text_color_inactive`}>{ingr && ingr.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}