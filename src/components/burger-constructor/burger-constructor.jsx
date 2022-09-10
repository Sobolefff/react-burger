import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
//import { ArrayPropTypes } from "../../utils/proptypes";
import { TotalPriceContext} from '../../services/BurgerConstructorContext';
import { apiPostOrder } from '../../utils/api';
import { useSelector } from 'react-redux';

export default function BurgerConstructor() {

  const { bun, content, count } = useSelector(store => ({
    bun: store.ingredients.constructorData.bun,
    content: store.ingredients.constructorData.content,
  }));

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ orderNum, setOrderNum ] = useState('');
  //const bunArr = useMemo(() => Array.from(data.filter((el) => el.type === "bun")), [data]);
  // const ingredients = useMemo(() => data.filter((el) => (el.type !== 'bun')), [data]);
  const bunIdArr = [`${bun._id}`]; 
  useMemo(() => bunIdArr.push(`${bun._id}`), [bun]);
  const orderData = useMemo(() => Array.from(content.map((el) => el._id)).concat(bunIdArr), [content]);



  const openModal = () => {
    setIsOrderDetailsOpened(true);
    apiPostOrder(orderData).then((res) => setOrderNum(res.order.number));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  

  useEffect(() => {
    let total = 0 + bun.price * 2;
    total = content.reduce(function (acc, obj) { return acc + obj.price; }, total);
    setTotalPrice(total);
  }, [totalPrice, setTotalPrice]);

    return (
      <section className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4`} >
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
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
                content.map((ingredient) => (
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
              <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={openModal}>
              Оформить заказ
            </Button>
          </div>
          {isOrderDetailsOpened && (
            <Modal onClose={closeAllModals}>
              <OrderDetails value={orderNum}/>
            </Modal>
          )}
        </TotalPriceContext.Provider>
      </section>
    );
}
// BurgerConstructor.propTypes = {
//   data: ArrayPropTypes,
// };