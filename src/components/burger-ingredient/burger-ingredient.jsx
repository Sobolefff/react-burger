import React from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { ingredientsPropTypes } from '../../utils/proptypes';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
    closeCurrentIngredient,
    openCurrentIngredient,
} from '../../services/actions';
import Modal from '../modal/modal';
import IngredientsDetails from '../ingredients-details/ingredients-details';

export default function BurgerIngredient(props) {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((store) => store.details.isModalOpen);
    const location = useLocation();
    const history = useHistory();
    const data = useSelector((store) => store.ingredients.data);
    const { bun, filling } = useSelector((store) => ({
        bun: store.construct.constructorData.bun,
        filling: store.construct.constructorData.filling,
    }));

    let count;
    filling &&
        filling.findLast((el) =>
            el._id === props._id ? (count = el.count) : null
        );
    const bunValue = bun && bun._id === props._id && bun.count;
    const [, dragRef] = useDrag(
        () => ({
            type: 'ingredient',
            item: props,
        }),
        [props]
    );

    const openModal = () => {
        dispatch(openCurrentIngredient(props), [dispatch]);
    };

    const closeAllModals = () => {
        history.goBack();
        dispatch(closeCurrentIngredient(props), [dispatch]);
    };

    return (
        <>
            <Link ref={dragRef}
                to={{
                    pathname: `/ingredients/${props._id}`,
                    state: { background: location },
                }}
                className={styles.link}
            >
                <div className={styles.card} onClick={openModal}>
                    <img src={props.image} alt={props.name} />
                    <div
                        className={`${styles.price} text text_type_digits-default`}
                    >
                        <p className={`${styles.price} pt-1 pb-1 pr-2`}>
                            {props.price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">{props.name}</p>
                    <div className={styles.count}>
                        {count && <Counter count={count} size="default" />}
                        {bunValue && (
                            <Counter count={bunValue} size="default" />
                        )}
                    </div>
                </div>
            </Link>
            {isModalOpen && (
                <>
                    <Modal title="Детали ингредиента" onClose={closeAllModals}>
                        <IngredientsDetails data={data} />
                    </Modal>
                </>
            )}
        </>
    );
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;
