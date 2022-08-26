import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import React, { useContext, useState } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ArrayPropTypes } from "../../utils/proptypes";
import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

const BurgerConstructor = () => {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const { data } = useContext(BurgerConstructorContext);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ orderNum, setOrderNum ] = useState('');
  
  const openModal = () => {
    setIsOrderDetailsOpened(true);
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const ingredients = data.filter((ingredient) => (ingredient.type !== 'bun'));
    return (
      <section className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4`} >
        <div className={`${burgerConstructorStyles.wrap} ml-8 pb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={20}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`${burgerConstructorStyles.wrap} `}>
          <ul className={`${burgerConstructorStyles.list} `}>
            { 
              ingredients.map((ingredient) => (
                <li className={`${burgerConstructorStyles.item} pb-4 pr-2`} key={ingredient._id}>
                  <div className='mr-2'><DragIcon type="primary" /></div>
                  <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
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
            price={20}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
          <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
            <p className='text text_type_digits-medium pr-2'>610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
        {isOrderDetailsOpened && (
          <Modal onClose={closeAllModals}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    );
}
BurgerConstructor.propTypes = {
  data: ArrayPropTypes,
};
export default BurgerConstructor;