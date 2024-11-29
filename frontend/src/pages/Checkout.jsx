import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/joy";
import styles from "./style.module.css";
import axios from "axios";
import CreateContextApi from "../hooks/CreateContextApi";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";

axios.defaults.baseURL = "http://localhost:3001";

export default function Checkout() {
  const { user, isAuthenticated } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const { cartData, setCartData, total, setTotal } =
    useContext(CreateContextApi);

  // Load cart data from cookies on component mount
  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    if (cartCookie) {
      setCartData(JSON.parse(cartCookie));
    }
  });

  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: user ? user.email : "",
    saveInfo: false,
    cashOnDelivery: true,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const placeOrder = async (orderData) => {
    console.log("Placing order", orderData);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("/order", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Order placed successfully");
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const orderData = {
      user: {
        name: user.name,
        email: user.email,
        auth0Id: user.sub,
      },
      billingDetails: {
        name: formData.firstName,
        email: formData.email,
        phone: formData.phoneNumber,
        address: {
          house: formData.apartment || "N/A",
          street: formData.streetAddress,
          city: formData.city,
          state: "N/A", // Adjust if needed
          postalCode: "N/A", // Placeholder; adjust if needed
          country: "Pakistan", // Default value
        },
      },
      cart: {
        items: cartData.map((data) => ({
          productId: data._id,
          quantity: data.items,
        })),
      },
      paymentMethod: formData.cashOnDelivery ? "Cash on Delivery" : "Other",
      totalAmount: total,
      status: "pending",
    };

    placeOrder(orderData);
  };

  return (
    <>
      <div className={styles.checkoutcontainer}>
        <div className={styles.billing}>
          <h1>Billing Details</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.name}>
              <label>First Name</label>
              <input type='text' name='firstName' onChange={handleChange} />
            </div>
            <div className={styles.street}>
              <label>Street Address</label>
              <input type='text' name='streetAddress' onChange={handleChange} />
            </div>
            <div className={styles.apartment}>
              <label>Apartment, floor, etc (optional)</label>
              <input type='text' name='apartment' onChange={handleChange} />
            </div>
            <div className={styles.city}>
              <label>Town City</label>
              <input type='text' name='city' onChange={handleChange} />
            </div>
            <div className={styles.number}>
              <label>Phone Number</label>
              <input type='number' name='phoneNumber' onChange={handleChange} />
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <input type='email' name='email' onChange={handleChange} />
            </div>
            <div className={styles.radio}>
              <input type='checkbox' name='saveInfo' onChange={handleChange} />
              <label>
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>
        <div className={styles.maincheckout}>
          <h1>Item Details</h1>
          <div className={styles.cartitems}>
            {cartData.map((data, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.imagesection}>
                  <img src={data.frontImage} alt={data.name} />
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
          <div className={styles.radio}>
            <input
              type='checkbox'
              name='cashOnDelivery'
              checked={formData.cashOnDelivery}
              onChange={handleChange}
            />
            <label>Cash On Delivery</label>
          </div>
          <Button type='submit' onClick={handleSubmit}>
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
}
