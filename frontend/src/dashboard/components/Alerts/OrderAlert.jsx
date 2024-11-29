import React from "react";
import styles from "./style.module.css";

const OrderAlert = ({ onConfirm, onCancel, order }) => {
  return (
    <div className={styles.alertBackground}>
      <div className={styles.alertBox}>
        <h2 className={styles.alertTitle}>Mark as Completed?</h2>
        <p className={styles.alertMessage}>
          Are you sure you want to Complete order from{" "}
          <strong>{order.productName}</strong> from{" "}
          <strong>{order.customerName}</strong> with{" "}
          <strong>Order Id: {order._id} </strong>?
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onConfirm}>
            Complete
          </button>
          <button className={styles.confirmButton} onClick={onCancel}>
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderAlert;
