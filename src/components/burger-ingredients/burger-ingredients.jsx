import { useRef, useState, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { ArrayPropTypes } from "../../utils/proptypes";
import { BurgerConstructorContext } from "../../services/BurgerConstructorContext";

export default function BurgerIngredients() {
  const { data } = useContext(BurgerConstructorContext);
  const [current, setCurrent] = useState('bun')
  const bunsArr = data.filter((el) => el.type === "bun");
  const mainArr = data.filter((el) => el.type === "main");
  const sauceArr = data.filter((el) => el.type === "sauce");

  const containerRef = useRef(null);

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scroll = (ref) =>
    containerRef.current.scroll({
      top: ref.current.offsetTop - containerRef.current.offsetTop - 40
    });

  const onTabClick = (tab, categoryRef) => () => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <section className="mr-10">
        <p className="text text_type_main-large">Соберите бургер</p>
        <div className={`${styles.optionselection} mt-5`}>
          <Tab active={current === 'bun'} onClick={onTabClick('bun', bunsRef)}>
            Булки
          </Tab>
          <Tab active={current === 'sauce'} onClick={onTabClick('sauce', sauceRef)}>
            Соусы
          </Tab>
          <Tab active={current === 'main'} onClick={onTabClick('main', mainRef)}>
            Начинки
          </Tab>
        </div>
        <section className={styles.options} ref={containerRef}>
          <>
            <IngredientsCategory
              id="bun"
              title="Булки"
              ingredients={bunsArr}
              ref={bunsRef}
            />
            <IngredientsCategory
              id="sauce"
              title="Соусы"
              ingredients={sauceArr}
              ref={sauceRef}
            />
            <IngredientsCategory
              id="main"
              title="Начинки"
              ingredients={mainArr}
              ref={mainRef}
            />
          </>
        </section>
      </section>
  );
}

BurgerIngredients.propTypes = {
  data: ArrayPropTypes
}