import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
//import { ArrayPropTypes } from "../../utils/proptypes";
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderNum,
  onDropHandler,
  deleteItem
} from '../../services/actions';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import BurgerFilling from '../burger-filling/burger-filling';

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const { bun, filling, order } = useSelector(store => ({
    bun: store.construct.constructorData.bun,
    filling: store.construct.constructorData.filling,
    order: store.ingredients.order
  }));
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const bunIdArr = bun && [`${bun._id}`]; 
  const bunsPrice = bun && bun.price * 2;
  const orderData = bun && filling && Array.from(filling.map((el) => el._id)).concat(bunIdArr);

  const dropHandler = (item) => {
    dispatch(onDropHandler(item));
  };
  const deleteHandler = (item) => {
    dispatch(deleteItem(item));
  };

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item, monitor) => { 
      dropHandler(item);
    },
  }));

  const openModal = () => {
    setIsOrderDetailsOpened(true);
    dispatch(getOrderNum(orderData));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  // useEffect(() => {
  //   dispatch(getTotalPrice(bun, filling));
  // }, [dispatch]);

  
    let totalPrice = bun && bunsPrice
      ? filling.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, bunsPrice)
      : filling.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, 0);

    return (
      <section className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4`} ref={dropTarget}>
            
            {bun && (
              <div className={`${burgerConstructorStyles} ml-8 pb-4`} >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}
            <ul className={`${burgerConstructorStyles.list} `}>
            {!bun && filling.length === 0 && (
              <div className={burgerConstructorStyles.hint}>
                <p className="text text_type_main-medium">Перенеси ингредиенты сюда, чтобы&nbsp;собрать&nbsp;бургер</p>
              </div>
            )}
            {!bun && filling.length > 0 && (
              <div className={burgerConstructorStyles.hint}>
                <p className="text text_type_main-medium">Добавь булку</p>
              </div>
            )}
            {bun && filling.length === 0 && (
              <div className={burgerConstructorStyles.hint}>
                <p className="text text_type_main-medium">Добавь начинку</p>
              </div>
            )}
              { 
                filling.map((item, index) => item.count > 0 && (
                  <BurgerFilling 
                    key={item.key}
                    item={item}
                    handleClose={() => deleteHandler(item)}
                    index={index}
                  />
                ))
              }
            </ul>
          {/* </div> */}
          {bun && (
              <div className={`${burgerConstructorStyles.wrap} ml-8 pb-4`} >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
          )}
          <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
            <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
              <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
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