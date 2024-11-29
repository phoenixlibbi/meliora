import React from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

export default function OrderDetails() {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.orderdetails}>
                <h1 className={styles.heading}>Order Has Been Successfully Placed</h1>
                <h1 className={styles.heading}>Order ID : 821828178172</h1>
                <button className={styles.homeButton} onClick={()=>navigate("/")}>Go To Homepage</button>
            </div>
        </>
    )
}
