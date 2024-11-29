import { Button } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { Navbar } from "../components/Navbar";
import Cart from "../components/Cart";
import CreateContextApi from "../hooks/CreateContextApi";
import ProductUsage from "../components/ProductUsage";
import ReviewSection from "../components/ReviewSection";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:3001";

export default function ProductDetails() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [limit, setLimit] = useState(1);
  const { showCart, setShowCart, cartData, setCartData } =
    useContext(CreateContextApi);

  useEffect(() => {
    // Check if 'cart' cookie exists
    const cartCookie = Cookies.get("cart");
    if (cartCookie) {
      // Parse and set the cart data if the cookie is present
      setCartData(JSON.parse(cartCookie));
    }
  });

  const handleAddToCart = () => {
    const existingProductIndex = cartData.findIndex(
      (item) => item.id === product.id
    );
    let updatedCart;
    if (existingProductIndex !== -1) {
      // Product already exists, update the quantity
      updatedCart = cartData.map((item, index) =>
        index === existingProductIndex ? { ...item, items: limit } : item
      );
    } else {
      // Product doesn't exist, add it to the cart
      updatedCart = [
        ...cartData,
        { ...product, items: limit }, // Add new product with the selected limit
      ];
    }

    // Update state and cookie
    setCartData(updatedCart);

    Cookies.set("cart", JSON.stringify(updatedCart), {
      expires: 1, // 1-day expiry
    });
    toast.success(`Cart Item Updated to ${limit}`, {
      autoClose: 1000,
      position: "top-center",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          alert("No product found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (!product) {
    return (
      <div className='h-screen flex justify-center content-center'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Cart />
      <div className={styles.maincontainer}>
        <span className={styles.whatsapplogo}>
          <FaWhatsapp />
        </span>
        <div className={styles.leftsection}>
          <div className={styles.imgsection}>
            <img src={product.frontImage} alt={product.name} />
          </div>
          <p>{product.description}</p>
        </div>
        <div className={styles.rightsection}>
          <h1 style={{ fontWeight: "bold" }}>{product.name}</h1>
          <h1>${product.price}</h1>
          <h5 style={{ fontSize: "12px", margin: "5px 0 10px 0" }}>
            Shipping - Calculated at checkout
          </h5>
          <Button>Use to refill your reusable spray bottles.</Button>
          <div className={styles.para} style={{ marginTop: "10px" }}>
            <p>{product.detail}</p>
          </div>
          <div className={styles.para} style={{ marginTop: "30px" }}>
            <p>{product.subDetail}</p>
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Size:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button key={index}>{size.size}</button>
            ))}
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Quantity:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button key={index}>{size.quantity}</button>
            ))}
          </div>
          <div className={styles.deliveryDetails} style={{ marginTop: "10px" }}>
            <div className={styles.one}>
              <div className={styles.logo}>
                <FiTruck />
              </div>
              <div className='text'>
                <h3>Fast Delivery</h3>
                <h3>Enter your postal code for Delivery Availability</h3>
              </div>
            </div>
            <div className={styles.two}>
              <div className={styles.logo}>
                <LiaSyncAltSolid />
              </div>
              <div className={styles.text}>
                <h3>Return Delivery</h3>
                <h3>Free 30 Days Delivery Returns. Details</h3>
              </div>
            </div>
          </div>
          <div className={styles.cartoptions}>
            <div className={styles.increaseLimit}>
              <button onClick={() => limit !== 1 && setLimit(limit - 1)}>
                -
              </button>
              {limit}
              <button onClick={() => setLimit(limit + 1)}>+</button>
            </div>
            <Button
              onClick={() => {
                handleAddToCart();
              }}>
              Add to Cart
            </Button>
          </div>
          <Button
            onClick={() => {
              setShowCart(!showCart);
            }}>
            Go To Cart
          </Button>
        </div>
      </div>
      <ProductUsage product={product} />
      <ReviewSection product={product} />
      <ToastContainer />
    </>
  );
}

// Made by: Zain Manzoor github: ZainManzoor2003
/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */
