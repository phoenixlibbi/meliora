import React from "react";
import styles from "./style.module.css";

export default function ProductUsage({ product }) {
  return (
    <div className={styles.productcardscontainer}>
      <h1>{product.usageTitle}</h1>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src={product.steps.step1.image} alt="Step 1" />
          <h3>{product.steps.step1.title}</h3>
          <p>{product.steps.step1.description}</p>
        </div>

        <div className={styles.card}>
          <img src={product.steps.step2.image} alt="Step 2" />
          <h3>{product.steps.step2.title}</h3>
          <p>{product.steps.step2.description}</p>
        </div>

        <div className={styles.card}>
          <img src={product.steps.step3.image} alt="Step 3" />
          <h3>{product.steps.step3.title}</h3>
          <p>{product.steps.step3.description}</p>
        </div>
      </div>
    </div>
  );
}

/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */
