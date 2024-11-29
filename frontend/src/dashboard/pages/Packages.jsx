import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from "../components/Alerts/Delete";
import Package from "../components/Modals/Package";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function Packages() {
  const [products, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [productToDelete, setPackageToDelete] = useState(null);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("/package");
      if (response.data && response.data.length > 0) {
        setPackages(response.data);
      } else {
        alert("No packages found");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddPackage = async (productData) => {
    try {
      const response = await axios.post("/package", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Package added successfully:", response.data);
      setShowAddModal(false);
      fetchPackages();
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedPackage(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setPackageToDelete(product);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/package/${productToDelete._id}`);
      setPackages((prevPackages) =>
        prevPackages.filter((p) => p._id !== productToDelete._id)
      );
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className={styles.manageItems}>
      <div className={styles.top}>
        <h1>Manage Packages</h1>
        <button onClick={() => setShowAddModal(true)}>Add Package</button>
      </div>
      <div className={styles.products}>
        <div className={styles.productgrid}>
          <div className={`${styles.header} ${styles.productno}`}>
            Package No.
          </div>
          <div className={`${styles.header} ${styles.productname}`}>
            Package Name
          </div>
          <div className={`${styles.header} ${styles.productprice}`}>Price</div>
          <div className={`${styles.header} ${styles.productstatus}`}>
            Status
          </div>
          <div className={`${styles.header} ${styles.productoperations}`}>
            Operations
          </div>

          {products.map((product, index) => (
            <React.Fragment key={product._id}>
              <div
                className={`${styles.productno} ${styles.productdescription}`}
              >
                {index + 1}
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    crossOrigin="anonymous"
                  />
                )}
              </div>
              <div
                className={`${styles.productname} ${styles.productdescription}`}
              >
                {product.name}
              </div>
              <div
                className={`${styles.productprice} ${styles.productdescription}`}
              >
                {product.price}
              </div>
              <div
                className={`${styles.productstatus} ${
                  styles.productdescription
                } ${
                  product.isAvailable === false
                    ? styles.outofstock
                    : styles.instock
                }`}
              >
                {product.isAvailable === false ? "Out of Stock" : "In Stock"}
              </div>
              <div
                className={`${styles.productoperations} ${styles.productdescription}`}
              >
                <button
                  className={styles.updatebtn}
                  onClick={() => handleUpdateClick(product)}
                >
                  Update
                </button>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleDeleteClick(product)}
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {showDeleteAlert && (
        <Delete
          text="Package"
          obj={productToDelete?.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}

      {showAddModal && (
        <Package
          onSubmit={handleAddPackage}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showModal && selectedPackage && (
        <Package
          pkg={selectedPackage}
          onSubmit={(updatedPackage) => {
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
