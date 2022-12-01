import { useRef, useState, useMemo, FC, RefObject } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const { data } = useSelector(store => ({
    data: store.ingredients.data,
  }));

  const [current, setCurrent] = useState('bun')
  const bunsArr = useMemo(() => data.filter((el) => el.type === "bun"), [data]);
  const mainArr = useMemo(() => data.filter((el) => el.type === "main"), [data]);
  const sauceArr = useMemo(() => data.filter((el) => el.type === "sauce"), [data]);
  const containerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const scroll = (ref: any) =>
    containerRef.current!.scroll({
      behavior: "smooth",
      top: ref.current.offsetTop - containerRef.current!.offsetTop - 40,
    });

  const onTabClick = (tab: string, categoryRef: RefObject<HTMLElement>) => () => {
    setCurrent(tab);
    scroll(categoryRef);
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
          <Tab value='' active={current === 'bun'} onClick={onTabClick('bun', bunsRef)}>
            Булки
          </Tab>
          <Tab value='' active={current === 'sauce'} onClick={onTabClick('sauce', sauceRef)}>
            Соусы
          </Tab>
          <Tab value='' active={current === 'main'} onClick={onTabClick('main', mainRef)}>
            Начинки
          </Tab>
        </div>
        <section className={styles.options} ref={containerRef} onScroll={handleScroll}>
          <>
            <IngredientsCategory
              id="bun"
              title="Булки"
              ingredients={bunsArr}
              ref={bunsRef}
              className={styles.category}
            />
            <IngredientsCategory
              id="sauce"
              title="Соусы"
              ingredients={sauceArr}
              ref={sauceRef}
              className={styles.category}
            />
            <IngredientsCategory
              id="main"
              title="Начинки"
              ingredients={mainArr}
              ref={mainRef}
              className={styles.category}
            />
          </>
        </section>
      </section>
  );
}