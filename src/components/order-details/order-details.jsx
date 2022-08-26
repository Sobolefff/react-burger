import styles from "./order-details.module.css";
import { OrderNumContext } from "../../services/BurgerConstructorContext";

export default function OrderDetails() {
  return (
    <OrderNumContext.Consumer>
      {(value) => (
        <>
          <p className={`${styles.title} text text text_type_digits-large`}>{value}</p>
          <p className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
          <div className={styles.check}></div>
          <p className={`${styles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </OrderNumContext.Consumer>
  );
}