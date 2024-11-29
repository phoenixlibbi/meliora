import React from 'react';
import styles from './style.module.css';

const Alert = ({ productName, onConfirm, onCancel }) => {
    return (
        <div className={styles.alertBackground}>
            <div className={styles.alertBox}>
                <h2 className={styles.alertTitle}>Delete Product</h2>
                <p className={styles.alertMessage}>
                    Are you sure you want to delete <strong>{productName}</strong>?
                </p>
                <div className={styles.buttonGroup}>
                    <button className={styles.confirmButton} onClick={onConfirm}>Yes</button>
                    <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Alert;