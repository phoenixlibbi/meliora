import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateModal from "../components/Modals/UpdateProduct";
import AddModal from "../components/Modals/AddProduct";
import Alert from "../components/Alerts/Alert";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function AddProducts() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddProduct = async (productData) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");

        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          alert("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/products/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Products</h1>
          <button onClick={() => setShowAddModal(true)}>Add Product</button>
        </div>
        <div className={styles.products}>
          <div className={styles.productgrid}>
            <div className={`${styles.header} ${styles.productno}`}>
              Product No.
            </div>
            <div className={`${styles.header} ${styles.productname}`}>
              Product Name
            </div>
            <div className={`${styles.header} ${styles.productprice}`}>
              Price
            </div>
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
                  <img src={product.frontImage} alt={product.name} />
                </div>
                <div
                  className={`${styles.productname} ${styles.productdescription}`}
                >
                  {product.name}
                </div>
                <div
                  className={`${styles.productprice} ${styles.productdescription}`}
                >
                  {product.price}$
                </div>
                <div
                  className={`${styles.productstatus} ${
                    styles.productdescription
                  } 
                  ${
                    product.stockQuantity === 0
                      ? styles.outofstock
                      : styles.instock
                  }`}
                >
                  {product.stockQuantity === 0 ? "Out of Stock" : "In Stock"}
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

        {/* Modals for updating and adding products */}
        {showModal && (
          <UpdateModal
            show={showModal}
            onClose={() => setShowModal(false)}
            product={selectedProduct}
          />
        )}

        {showAddModal && (
          <AddModal
            show={showAddModal}
            onClose={() => setShowAddModal(false)}
            submitAction={handleAddProduct}
          />
        )}

        {showDeleteAlert && (
          <Alert
            productName={productToDelete.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}
