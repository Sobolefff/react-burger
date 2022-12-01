import {
    ConstructorElement,
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { useState, FC } from 'react';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { useDispatch, useSelector } from '../../services/store';
import { onDropHandler, deleteItem } from '../../services/actions';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { BurgerFilling } from '../burger-filling/burger-filling';
import { useHistory } from 'react-router-dom';
import { openOrderModal } from '../../services/actions/order';
import { TIngredientData } from '../../utils/types';

export const BurgerConstructor: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { bun, filling, userName } = useSelector((store) => ({
        bun: store.construct.burgerIngredients.bun,
        filling: store.construct.burgerIngredients.fillings,
        userName: store.user.user.name,
    }));

    const redirectFunc = () => {
        history.replace({ pathname: '/login' });
    };

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
    const bunsPrice = bun && bun.price * 2;

    const dropHandler = (item: TIngredientData) => {
        dispatch(onDropHandler(item));
    };

    const [, dropTarget] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item: TIngredientData, monitor) => {
            dropHandler(item);
        },
    }));
    const bunIdArr = bun && [`${bun._id}`];
    const orderData =
        bun && filling && filling.map((el) => el._id).concat(bunIdArr!);
    const openModal = () => {
        setIsOrderDetailsOpened(true);
        orderData && dispatch(openOrderModal(orderData!), [dispatch]);
    };

    const closeAllModals = () => {
        setIsOrderDetailsOpened(false);
    };

    const deleteHandler = (item: TIngredientData) => {
        dispatch(deleteItem(item));
    };

    const totalPrice = filling.reduce(
        function (acc, obj) {
            return acc + obj.price * obj.count;
        },
        bun && bunsPrice ? bunsPrice : 0
    );

    return (
        <section
            className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4`}
            ref={dropTarget}
        >
            {bun && (
                <div className={`${burgerConstructorStyles} ml-8 pb-4`}>
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
                        <p className="text text_type_main-medium">
                            Перенесите ингредиенты сюда,
                            чтобы&nbsp;собрать&nbsp;бургер
                        </p>
                    </div>
                )}
                {!bun && filling.length > 0 && (
                    <div className={burgerConstructorStyles.hint}>
                        <p className="text text_type_main-medium">
                            Добавьте булку
                        </p>
                    </div>
                )}
                {bun && filling.length === 0 && (
                    <div className={burgerConstructorStyles.hint}>
                        <p className="text text_type_main-medium">
                            Добавьте начинку
                        </p>
                    </div>
                )}
                {filling.map((item, index) => (
                    <BurgerFilling
                        key={item.key}
                        item={item}
                        index={index}
                        handleClose={() => deleteHandler(item)}
                    />
                ))}
            </ul>
            {bun && (
                <div className={`${burgerConstructorStyles.wrap} ml-8 pb-4`}>
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
                    <p className="text text_type_digits-medium pr-2">
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    htmlType='button'
                    type="primary"
                    size="large"
                    onClick={userName ? openModal : redirectFunc}
                >
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
};
