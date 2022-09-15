import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { useState } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderNum,
  onDropHandler,
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
  const bunsPrice = bun && bun.price * 2;

  const dropHandler = (item) => {
    dispatch(onDropHandler(item));
  };
  

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item, monitor) => { 
      dropHandler(item);
    },
  }));

  const openModal = () => {
    const bunIdArr = bun && [`${bun._id}`];
    const orderData = bun && filling && filling.map((el) => el._id).concat(bunIdArr);
    setIsOrderDetailsOpened(true);
    dispatch(getOrderNum(orderData));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };
  
    const totalPrice = 
      filling.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, bun && bunsPrice ? bunsPrice : 0)

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
                <p className="text text_type_main-medium">Перенесите ингредиенты сюда, чтобы&nbsp;собрать&nbsp;бургер</p>
              </div>
            )}
            {!bun && filling.length > 0 && (
              <div className={burgerConstructorStyles.hint}>
                <p className="text text_type_main-medium">Добавьте булку</p>
              </div>
            )}
            {bun && filling.length === 0 && (
              <div className={burgerConstructorStyles.hint}>
                <p className="text text_type_main-medium">Добавьте начинку</p>
              </div>
            )}
              { 
                filling.map((item, index) => (
                  <BurgerFilling 
                    key={item.key}
                    item={item}
                    index={index}
                  />
                ))
              }
            </ul>
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
              <OrderDetails />
            </Modal>
          )}
        
      </section>
    );
}