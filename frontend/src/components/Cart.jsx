import React, { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateContextApi from "../hooks/CreateContextApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { showCart, setShowCart, cartData, setCartData, total, setTotal } =
    useContext(CreateContextApi);
  const [bgColor, setBgColor] = useState("transparent");
  const navigate = useNavigate();
  useEffect(() => {
    let timeout;
    if (showCart) {
      timeout = setTimeout(() => {
        document.body.classList.add("no-scroll");
        window.scrollTo(0, 0); // Scroll to the top of the page
        setBgColor("rgba(0, 0, 0, 0.5)"); // light black background
      }, 1000); // 1 second delay
    } else {
      document.body.classList.remove("no-scroll");
      setBgColor("transparent"); // reset background when modal is hidden
    }
    return () => clearTimeout(timeout); // cleanup on unmount or when showCart changes
  }, [showCart]);
  return (
    <>
      <motion.div
        className={styles.cartcontainer}
        initial={{ x: "100vw" }}
        animate={{ x: showCart ? 0 : "100vw" }}
        transition={{ duration: 1, ease: "easeInOut" }}>
        <div
          className={styles.leftsection}
          style={{ backgroundColor: bgColor }}></div>
        <div className={styles.rightsection}>
          <div className={styles.crossicon}>
            <RxCross1 onClick={() => setShowCart(!showCart)} />
          </div>
          <div className={styles.topheading}>
            <h1>CART</h1>
          </div>
          <div className={styles.cartitems}>
            {cartData.map((data, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.imagesection}>
                  <img src={data.frontImage} alt='' />
                </div>
                <div className={styles.itemright}>
                  <h5>{data.name}</h5>
                  <h5>
                    ${data.price} x {data.items}
                  </h5>
                </div>
              </div>
            ))}
            <hr />
          </div>
          <div className={styles.label1}>
            <h3>SubTotal:</h3>
            <h3>${total}</h3>
          </div>
          <div className={styles.label2}>
            <h3>Shipping:</h3>
            <h3>Free</h3>
          </div>
          <div className={styles.label3}>
            <h3>Total:</h3>
            <h3>${total}</h3>
          </div>
          <div className={styles.checkout}>
            <button
              style={{
                color: "white",
                fontSize: "18px",
                border: "2px solid white",
                padding: "10px",
              }}
              onClick={() => {
                navigate("/checkout");
                setShowCart(!showCart);
                document.body.classList.remove("no-scroll");
              }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Made by: Zain Manzoor github: ZainManzoor2003
