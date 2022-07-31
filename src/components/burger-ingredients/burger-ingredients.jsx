import { useState } from 'react';
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import burgerIngredientsStyles from './burger-ingredients.module.css'

const getIngredients = (data, type) => {
    return (
        <ul className={`${burgerIngredientsStyles.listBox}`}>
      {
        data.filter((ingredient) => (ingredient.type === type)).map((ingredient) => (
          <li className={`${burgerIngredientsStyles.item} pb-8`} key={ingredient._id}>
            <img src={ingredient.image} alt="" />
            <div className={`${burgerIngredientsStyles.itemBox} text text_type_digits-default`}>
              <p className={`${burgerIngredientsStyles.itemPrice} pt-1 pb-1 pr-2`}>{ingredient.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default`}>{ingredient.name}</p>
            <div className={`${burgerIngredientsStyles.count}`}>
              <Counter count={1} size="default" />
            </div>
          </li>
        ))
      }
    </ul>
    );
}

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');
  
    return (
        <section className='mr-10'>
          <h1 className={`${burgerIngredientsStyles.heading} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
          <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
          <ul className={`${burgerIngredientsStyles.list}`}>
            <li>
              <h2 className={`${burgerIngredientsStyles.heading} text text_type_main-medium pb-6 pt-10`}>Булки</h2>
              {getIngredients(data, 'bun')}
            </li>
            <li>
              <h2 className={`${burgerIngredientsStyles.heading} text text_type_main-medium pb-6 pt-10`}>Соусы</h2>
              {getIngredients(data, 'sauce')}
            </li>
            <li>
              <h2 className={`${burgerIngredientsStyles.heading} text text_type_main-medium pb-6 pt-10`}>Начинки</h2>
              {getIngredients(data, 'main')}
            </li>
          </ul>
        </section>
    );
  };
  
  export default BurgerIngredients;