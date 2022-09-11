import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
//import { ArrayPropTypes } from "../../utils/proptypes";
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderNum,
  getTotalPrice,
  onDropHandler,
  deleteItem
} from '../../services/actions';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const { bun, filling, order, totalPrice } = useSelector(store => ({
    bun: store.ingredients.constructorData.bun,
    filling: store.ingredients.constructorData.filling,
    order: store.ingredients.order,
    totalPrice: store.ingredients.totalPrice
  }));
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const bunIdArr = [`${bun._id}`]; 
  useMemo(() => bunIdArr.push(`${bun._id}`), [bun]);
  const orderData = useMemo(() => Array.from(filling.map((el) => el._id)).concat(bunIdArr), [filling]);



  const openModal = () => {
    setIsOrderDetailsOpened(true);
    dispatch(getOrderNum(orderData));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  useEffect(() => {
    dispatch(getTotalPrice(bun, filling));
  }, [dispatch]);

    return (
      <section className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4`} >
        
          <div className={`${burgerConstructorStyles.wrap} ml-8 pb-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={`${burgerConstructorStyles.wrap} `}>
            <ul className={`${burgerConstructorStyles.list} `}>
              { 
                filling.map((ingredient) => (
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
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
            <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
              {totalPrice && (<p className='text text_type_digits-medium pr-2'>{totalPrice}</p>)}
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={openModal}>
              Оформить заказ
            </Button>
          </div>
          {isOrderDetailsOpened && (
            <Modal onClose={closeAllModals}>
              <OrderDetails value={order}/>
            </Modal>
          )}
        
      </section>
    );
}
// BurgerConstructor.propTypes = {
//   data: ArrayPropTypes,
// };