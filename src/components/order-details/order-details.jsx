import { useSelector } from "react-redux";
import styles from "./order-details.module.css";

export default function OrderDetails() {
  const { orderNum, isLoading, hasError} = useSelector(store => ({
    orderNum: store.ord.orderNum,
    isLoading: store.ord.isLoading,
    hasError: store.ord.hasError,
  }));
  return (
    <>
    {!isLoading && !orderNum && <p className={`${styles.subtitle} text text_type_main-medium`}>Проверьте, собран ли бургер</p>}
    {isLoading && <p className={`${styles.subtitle} text text_type_main-medium`}>Отправляем ваш заказ на космическую кухню. Подождите...</p>}
    
    {hasError && <p className={`${styles.subtitle} text text_type_main-medium`}>Упс, неполадки на орбите! Попробуйте еще раз</p>}
    {!isLoading && !hasError && orderNum &&
    <>
      <p className={`${styles.title} text text text_type_digits-large` }>{orderNum}</p>
      <p className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={styles.check}></div>
      <p className={`${styles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>
    }
    </>
  )
}