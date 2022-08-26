import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

export default function Modal({
    title,
    onClose,
    children,
}) {

    const handleEscKeydown = (evt) => {
        evt.key === "Escape" && onClose()
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
                <button className={styles.closebutton} onClick={onClose}>
                    <CloseIcon />
                </button>
                <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalsContainer
    );
}   