import React from "react";
import ReactDOM from "react-dom";
import styles from "./details-modal.module.css";

const modalsContainer = document.querySelector("#modals");

export default function DetailsModal({ title, children }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
    </>,
    modalsContainer
  );
}