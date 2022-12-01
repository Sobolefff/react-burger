import ReactDOM from "react-dom";
import { useEffect, FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { TModalProps } from "../../utils/types";

const modalsContainer = document.querySelector("#modals");

export const Modal: FC<TModalProps> = (props: TModalProps) => {

    const handleEscKeydown = (evt: KeyboardEvent) => {
        evt.key === "Escape" && props.onClose!();
    }

    useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
        document.removeEventListener("keydown", handleEscKeydown);
    };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <button className={styles.closebutton} onClick={props.onClose}>
                    <CloseIcon type='primary' />
                </button>
                <h3 className={`${styles.title} text text_type_main-large`}>{props.title}</h3>
                {props.children}
            </div>
            <ModalOverlay onClick={props.onClose!} />
        </>,
        modalsContainer!
    );
}   