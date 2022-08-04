import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ props }) => {
    return (
        <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`} >
      <div className={`${burgerConstructorStyles.wrap} ml-8 pb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${burgerConstructorStyles.wrap} `}>
        <ul className={`${burgerConstructorStyles.list} `}>
          {
            data.filter((ingredient) => (ingredient.type !== 'bun')).map((ingredient) => (
              <li className={`${burgerConstructorStyles.item} pb-4 pr-2`} key={ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={50}
                  thumbnail={ingredient.image}
                />
              </li>
            ))
          }
        </ul>
      </div>
      <div className={`${burgerConstructorStyles.wrap} ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[0].name} (низ)`}
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
        <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section >
    );
}

export default BurgerConstructor;