import React from "react";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";

export default function BurgerIngredient(props) {
    const [isIngredientsDetailsOpened, setIngredientsDetailsIsOpened] = React.useState(false)
    const openModal = () => {
        setIngredientsDetailsIsOpened(true)
    }
    const closeAllModals = () => {
        setIngredientsDetailsIsOpened(false)
    }
    const handleEscKeydown = (evt) => {
        evt.key === "Escape" && closeAllModals()
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
            {isIngredientsDetailsOpened && (
                <Modal
                    title="Детали ингредиента"
                    onOverlayClick={closeAllModals}
                    onEscKeyDown={handleEscKeydown}
                >
                    <IngredientsDetails {...props} />
                </Modal>
            )}
        </>
    )
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;