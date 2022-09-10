import React from "react";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import { useDispatch, useSelector } from "react-redux";
import { openCurrentIngredient, closeCurrentIngredient } from '../../services/actions'

export default function BurgerIngredient(props) {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(store => store.details.isModalOpen);
    const openModal = () => {
        dispatch(openCurrentIngredient(props), [dispatch]);
    }
    const closeAllModals = () => {
        dispatch(closeCurrentIngredient(props), [dispatch]);
    }

    return (
        <>
            <div className={styles.card} onClick={openModal}>
                <img src={props.image} alt={props.name} />
                <div className={`${styles.price} text text_type_digits-default`}>
                    <p className={`${styles.price} pt-1 pb-1 pr-2`}>
                        {props.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{props.name}</p>
                <div className={styles.count}>
                    <Counter count={1} size="default" />
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    title="Детали ингредиента"
                    onClose={closeAllModals}
                >
                    <IngredientsDetails />
                </Modal>
            )}
        </>
    )
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;