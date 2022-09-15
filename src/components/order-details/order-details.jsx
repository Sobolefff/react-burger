import { useSelector } from "react-redux";
import styles from "./order-details.module.css";

export default function OrderDetails() {
  const { order } = useSelector(store => ({
    order: store.ingredients.order,
  }));
  return (
    order && 
    <>
      <p className={`${styles.title} text text text_type_digits-large` }>{order}</p>
      <p className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={styles.check}></div>
      <p className={`${styles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}