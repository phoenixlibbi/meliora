import React, { useState, useEffect } from "react";
import axios from "axios";
import CompleteOrder from "../components/Alerts/CompleteOrder";
import CancelOrder from "../components/Alerts/CancelOrder";
import DeleteOrder from "../components/Alerts/DeleteOrder";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function Orders() {
  // Alerts
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showCompleteAlert, setShowCompleteAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Orders States
  const [orders, setOrders] = useState([]);
  const [changeOrder, setChangeOrder] = useState(null);

  const fetchAdditionalData = async (order) => {
    try {
      const productDetails = await Promise.all(
        order.cart.items.map(async (item) => {
          try {
            const productResponse = await axios.get(
              `/products/${item.productId}`
            );
            return {
              productId: item.productId,
              productName: productResponse.data.name,
              quantity: item.quantity,
            };
          } catch (error) {
            console.error(
              `Error fetching product data for ID ${item.productId}:`,
              error
            );
            return {
              productId: item.productId,
              productName: "Unknown",
              quantity: item.quantity,
            };
          }
        })
      );

      return {
        ...order,
        productDetails,
      };
    } catch (error) {
      console.error("Error fetching additional data:", error);
      return { ...order, productDetails: [] };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/order");

        if (response.data && response.data.length > 0) {
          const ordersWithDetails = await Promise.all(
            response.data.map((order) => fetchAdditionalData(order))
          );
          setOrders(ordersWithDetails);
        } else {
          alert("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const handleCompleteClick = (product) => {
    setChangeOrder(product);
    setShowCompleteAlert(true);
  };

  const handleCancelClick = (product) => {
    setChangeOrder(product);
    setShowCancelAlert(true);
  };

  const handleDeleteClick = (product) => {
    setChangeOrder(product);
    setShowDeleteAlert(true);
  };

  const handleUpdateStatus = async (s) => {
    try {
      await axios.put(`/order/${changeOrder._id}`, {
        ...changeOrder,
        status: s,
      });
      setOrders((prevProducts) =>
        prevProducts.map((p) =>
          p._id === changeOrder._id ? { ...p, status: s } : p
        )
      );
      setShowCompleteAlert(false);
      if (s === "completed") {
        setShowCompleteAlert(false);
      }
      if (s === "cancelled") {
        setShowCancelAlert(false);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/order/${changeOrder._id}`);
      setOrders((prevProducts) =>
        prevProducts.filter((p) => p._id !== changeOrder._id)
      );
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const renderOrdersByStatus = (status) => {
    const filteredOrders = orders.filter(
      (product) => product.status === status
    );

    return filteredOrders.length > 0 ? (
      filteredOrders.map((order, index) => (
        <React.Fragment key={index}>
          <div className={`${styles.productno} ${styles.productdescription}`}>
            {order._id}
          </div>
          <div className={`${styles.productname} ${styles.productdescription}`}>
            <div className="flex flex-col">
              <div>
                Cutomer Name: <strong>{order.billingDetails.name}</strong>
              </div>
              <div>
                Email: <strong>{order.billingDetails.email}</strong>
              </div>
              <div>
                Contact: <strong>{order.billingDetails.phone}</strong>
              </div>
              <div className="flex flex-col">
                <div>
                Address: <strong>{order.billingDetails.address.house},{order.billingDetails.address.street}</strong>
                </div>
                <div>
                  Postal Code: <strong>{order.billingDetails.address.postalCode}</strong>
                </div>
                <div>
                City: <strong>{order.billingDetails.address.city},{order.billingDetails.address.country}</strong>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.productprice} ${styles.productdescription}`}
          >
            <div>
              {order.productDetails.map((product) => (
                <div key={product.productId}>
                  <div>
                    Product Name: <strong>{product.productName}</strong>
                  </div>
                  <div>
                    Quantity: <strong>{product.quantity}</strong>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <div
            className={`${styles.productprice} ${styles.productdescription}`}
            style={{
              color:
                order.status === "pending"
                  ? "#216D9E"
                  : order.status === "completed"
                  ? "green"
                  : "red",
            }}
          >
            {order.status}
          </div>
          <div
            className={`${styles.productoperations} ${styles.productdescription}`}
          >
            {status === "pending" && (
              <div>
                <button
                  className={styles.updatebtn}
                  onClick={() => handleCompleteClick(order)}
                >
                  Complete
                </button>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleCancelClick(order)}
                >
                  Cancel
                </button>
              </div>
            )}
            {(status === "completed" || status === "cancelled") && (
              <div>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleDeleteClick(order)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </React.Fragment>
      ))
    ) : (
      <div className="text-xl text-white">
        No <strong>{status}</strong> Orders
      </div>
    );
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Orders</h1>
        </div>

        {["pending", "completed", "cancelled"].map((status) => (
          <div key={status} className={styles.orders}>
            <div className={styles.productgrid}>
              <div className={`${styles.header} ${styles.productno}`}>
                Order No.
              </div>
              <div className={`${styles.header} ${styles.productname}`}>
                Customer Details
              </div>
              <div className={`${styles.header} ${styles.productname}`}>
                Product Details
              </div>
              <div className={`${styles.header} ${styles.productname}`}>
                Status
              </div>
              <div className={`${styles.header} ${styles.productoperations}`}>
                Operations
              </div>
              {renderOrdersByStatus(status)}
            </div>
          </div>
        ))}

        {showCompleteAlert && (
          <CompleteOrder
            onConfirm={() => handleUpdateStatus("completed")}
            onCancel={() => setShowCompleteAlert(false)}
            order={changeOrder}
          />
        )}

        {showCancelAlert && (
          <CancelOrder
            order={changeOrder}
            onConfirm={() => handleUpdateStatus("cancelled")}
            onCancel={() => setShowCancelAlert(false)}
          />
        )}

        {showDeleteAlert && (
          <DeleteOrder
            order={changeOrder}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}

/* 
Made by: Wali M. Ahmad 
Github: WaliMuhammadAhmad
*/
