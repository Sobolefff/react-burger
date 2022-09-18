import { useSelector } from "react-redux";
import styles from "./order-details.module.css";

export default function OrderDetails() {
  const { order, orderNumRequest, orderNumFailed} = useSelector(store => ({
    order: store.ingredients.order,
    orderNumRequest: store.ingredients.orderNumRequest,
    orderNumFailed: store.ingredients.orderNumFailed
  }));
  return (
    <>
    {!orderNumRequest && !order && <p className={`${styles.subtitle} text text_type_main-medium`}>Проверьте, собран ли бургер</p>}
    {orderNumRequest && <p className={`${styles.subtitle} text text_type_main-medium`}>Отправляем ваш заказ на космическую кухню. Подождите...</p>}
    
    {orderNumFailed && <p className={`${styles.subtitle} text text_type_main-medium`}>Упс, неполадки на орбите! Попробуйте еще раз</p>}
    {!orderNumRequest && !orderNumFailed && order &&
    <>
      <p className={`${styles.title} text text text_type_digits-large` }>{order}</p>
      <p className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={styles.check}></div>
      <p className={`${styles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>
    }
    </>
  )
}