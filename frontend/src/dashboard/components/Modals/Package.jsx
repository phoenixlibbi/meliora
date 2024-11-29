import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";

export default function Package({ onClose, pkg }) {
  const [currentPackage, setCurrentPackage] = useState({
    name: "",
    details: "",
    subDetails: "",
    description: "",
    subDescription: "",
    size: "Small",
    type: "",
    price: "",
    image: null,
    products: [],
    isAvailable: true,
  });

  useEffect(() => {
    if (pkg) {
      setCurrentPackage({
        name: pkg.name,
        details: pkg.details,
        subDetails: pkg.subDetails,
        description: pkg.description,
        subDescription: pkg.subDescription,
        size: pkg.size || "Small",
        type: pkg.type,
        price: pkg.price,
        image: pkg.image,
        products: pkg.products || [],
        isAvailable: pkg.isAvailable || true,
      });
    } else {
      setCurrentPackage({
        name: "",
        details: "",
        subDetails: "",
        description: "",
        subDescription: "",
        size: "Small",
        type: "",
        price: "",
        image: null,
        products: [],
        isAvailable: true,
      });
    }
  }, [pkg]);

  const handleChange = (field, value) => {
    setCurrentPackage((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (pkg) {
        await axios.put(`/package/${pkg._id}`, currentPackage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/package/", currentPackage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onClose();
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  return (
    <form encType="multipart/form-data" className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <span className={styles.closeicon} onClick={onClose}>
          &times;
        </span>
        <h2>{pkg ? "Update Package" : "Add Package"}</h2>
        <label>Package Name:</label>
        <input
          type="text"
          value={currentPackage.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={styles.blogInput}
        />
        <label>Details:</label>
        <input
          type="text"
          value={currentPackage.details}
          onChange={(e) => handleChange("details", e.target.value)}
          className={styles.blogInput}
        />
        <label>Sub-Details:</label>
        <input
          type="text"
          value={currentPackage.subDetails}
          onChange={(e) => handleChange("subDetails", e.target.value)}
          className={styles.blogInput}
        />
        <label>Description:</label>
        <input
          type="text"
          value={currentPackage.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={styles.blogInput}
        />
        <label>Sub-Description:</label>
        <input
          type="text"
          value={currentPackage.subDescription}
          onChange={(e) => handleChange("subDescription", e.target.value)}
          className={styles.blogInput}
        />
        <label>Size:</label>
        <select
          value={currentPackage.size}
          onChange={(e) => handleChange("size", e.target.value)}
          className={styles.blogInput}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Extra Large">Extra Large</option>
        </select>
        <label>Type:</label>
        <input
          type="text"
          value={currentPackage.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className={styles.blogInput}
        />
        <label>Price:</label>
        <input
          type="number"
          value={currentPackage.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className={styles.blogInput}
        />
        <label>Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => handleChange("image", e.target.files[0])}
          className={styles.blogInput}
        />
        <label>Products (IDs, comma-separated):</label>
        <input
          type="text"
          value={currentPackage.products.join(", ")}
          onChange={(e) =>
            handleChange(
              "products",
              e.target.value.split(",").map((id) => id.trim())
            )
          }
          className={styles.blogInput}
        />
        <label>Available:</label>
        <input
          type="checkbox"
          checked={currentPackage.isAvailable}
          onChange={(e) => handleChange("isAvailable", e.target.checked)}
        />
        <button onClick={handleSubmit}>
          {pkg ? "Update Package" : "Add Package"}
        </button>
      </div>
    </form>
  );
}
