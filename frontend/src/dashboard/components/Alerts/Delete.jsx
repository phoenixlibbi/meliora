import React from 'react';
import styles from './style.module.css';

const Delete = ({ text ,obj, onConfirm, onCancel }) => {
    return (
        <div className={styles.alertBackground}>
            <div className={styles.alertBox}>
                <h2 className={styles.alertTitle}>Delete {text}</h2>
                <p className={styles.alertMessage}>
                    Are you sure you want to Delete <strong>{obj}</strong>?
                </p>
                <div className={styles.buttonGroup}>
                    <button className={styles.confirmButton} onClick={onConfirm}>Yes</button>
                    <button className={styles.cancelButton} onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Delete;