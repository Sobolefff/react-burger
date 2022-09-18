import { useRef, useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
//import { ArrayPropTypes } from "../../utils/proptypes";
import { useDispatch, useSelector } from "react-redux";
import { closeCurrentIngredient, openCurrentIngredient } from "../../services/actions";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredients-details/ingredients-details";

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const {data, isModalOpen} = useSelector(store => ({
    data: store.ingredients.data,
    isModalOpen: store.details.isModalOpen,
  }));

  const openModal = (ingredient) => {
    dispatch(openCurrentIngredient(ingredient));
  }
  const closeAllModals = () => {
    dispatch(closeCurrentIngredient());
  }

  const [current, setCurrent] = useState('bun')
  const bunsArr = useMemo(() => data.filter((el) => el.type === "bun"), [data]);
  const mainArr = useMemo(() => data.filter((el) => el.type === "main"), [data]);
  const sauceArr = useMemo(() => data.filter((el) => el.type === "sauce"), [data]);
  const containerRef = useRef(null);
  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const onTabClick = (tab) => () => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
		if (containerRef && bunsRef && sauceRef && mainRef && containerRef.current && bunsRef.current && sauceRef.current && mainRef.current) {
			const bunDistance = Math.abs(containerRef.current.getBoundingClientRect().top - bunsRef.current.getBoundingClientRect().top)
			const sauceDistance = Math.abs(containerRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
			const mainDistance = Math.abs(containerRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
			const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader = minDistance === bunDistance
				? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
			setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader))
		}
	}

  return (
      <section className="mr-10">
        <p className="text text_type_main-large mt-5">Соберите бургер</p>
        <div className={`${styles.optionselection} mt-10`}>
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
        <section className={styles.options} ref={containerRef} onScroll={handleScroll}>
          <>
            <IngredientsCategory
              openModal={openModal}
              id="bun"
              title="Булки"
              ingredients={bunsArr}
              ref={bunsRef}
            />
            <IngredientsCategory
              openModal={openModal}
              id="sauce"
              title="Соусы"
              ingredients={sauceArr}
              ref={sauceRef}
            />
            <IngredientsCategory
              openModal={openModal}
              id="main"
              title="Начинки"
              ingredients={mainArr}
              ref={mainRef}
            />
          </>
        </section>
        {isModalOpen && (
                <Modal
                    title="Детали ингредиента"
                    onClose={closeAllModals}
                >
                    <IngredientsDetails />
                </Modal>
        )}
      </section>
  );
}