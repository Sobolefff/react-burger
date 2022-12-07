import React from "react";
import styles from "./details-modal.module.css";
import { TDetailsPageProps } from "../../utils/types";

export const DetailsModal = (props: TDetailsPageProps) => {
  return (
    <>
      <div className={styles.modal}>
        <h3 className={styles.title}>{props.title}</h3>
        {props.children}
      </div>
    </>
  );
}