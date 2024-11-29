import { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";

// Transform data to the required schema for API
const transformDataToSchema = (formData) => {
  const {
    name,
    detail,
    subsection: subDetail,
    description,
    price,
    sizes,
    stepTitle1,
    stepDescription1,
    stepImage1,
    stepTitle2,
    stepDescription2,
    stepImage2,
    stepTitle3,
    stepDescription3,
    stepImage3,
    stock: stockQuantity,
    usageTitle,
    frontImage,
    backImage,
  } = formData;

  const formattedSteps = [
    {
      title: stepTitle1,
      description: stepDescription1,
      image: stepImage1,
    },
    {
      title: stepTitle2,
      description: stepDescription2,
      image: stepImage2,
    },
    {
      title: stepTitle3,
      description: stepDescription3,
      image: stepImage3,
    },
  ];

  const steps = {
    step1: formattedSteps[0],
    step2: formattedSteps[1],
    step3: formattedSteps[2],
  };

  const transformedData = {
    name,
    detail,
    subDetail,
    description,
    price,
    sizes: [
      { size: "Small", quantity: sizes.small.quantity },
      { size: "Medium", quantity: sizes.medium.quantity },
      { size: "Large", quantity: sizes.large.quantity },
      { size: "XL", quantity: sizes.xl.quantity },
    ],
    frontImage,
    backImage,
    stockQuantity,
    usageTitle,
    steps,
  };

  return transformedData;
};

export default function AddModal({ onClose }) {
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    detail: "",
    subsection: "",
    description: "",
    price: 0,
    stock: 0,
    sizes: {
      small: { selected: false, quantity: 0 },
      medium: { selected: false, quantity: 0 },
      large: { selected: false, quantity: 0 },
      xl: { selected: false, quantity: 0 },
    },
    frontImage: null,
    backImage: null,
    steps: [
      { title: "", description: "", image: null },
      { title: "", description: "", image: null },
      { title: "", description: "", image: null },
    ],
  });

  const handleSubmit = async () => {
    try {
      const product = transformDataToSchema(currentProduct);
      console.log(product);

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("/products", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully");
    } catch (error) {
      console.error("Error adding Product:", error);
      const message = error.response?.data?.error || "Failed to add product";
      alert(message);
    }
  };

  return (
    <div className={styles.modaloverlay}>
      <form encType="multipart/form-data" className={styles.modalcontent}>
        <span className={styles.closeicon} onClick={onClose}>
          &times;
        </span>
        <div className={styles.flexContainer}>
          {/* Product Information Section */}
          <div className={styles.column}>
            <h3 style={{ fontWeight: "bold" }}>Product Information</h3>
            <div className={styles.row}>
              <label>Name:</label>
              <input
                type="text"
                value={currentProduct.name || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Detail:</label>
              <input
                type="text"
                value={currentProduct.detail || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    detail: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Sub Section:</label>
              <input
                type="text"
                value={currentProduct.subsection || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    subsection: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Description:</label>
              <input
                type="text"
                value={currentProduct.description || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Price:</label>
              <input
                type="number"
                className={styles.counterInput}
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    price: Math.max(0, Number(e.target.value)), // Prevent negative values
                  }))
                } // Prevent negative values
              />
              <label style={{ marginLeft: "10px" }}>Stock:</label>
              <input
                type="number"
                className={styles.counterInput}
                value={currentProduct.stock}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stock: Math.max(0, Number(e.target.value)), // Prevent negative values
                  }))
                } // Prevent negative values
              />
            </div>
            <h4 style={{ fontWeight: "bold" }}>Sizes and Quantity</h4>
            <div className={styles.row}>
              {/* Sizes Column */}
              <div className={styles.column}>
                <div>
                  <input
                    type="checkbox"
                    id="small"
                    value="Small"
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          small: {
                            selected: e.target.checked,
                            quantity: prev.sizes?.small?.quantity || 0,
                          },
                        },
                      }))
                    }
                  />
                  <label style={{ marginLeft: "10px" }} htmlFor="small">
                    Small
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="medium"
                    value="Medium"
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          medium: {
                            selected: e.target.checked,
                            quantity: prev.sizes?.medium?.quantity || 0,
                          },
                        },
                      }))
                    }
                  />
                  <label style={{ marginLeft: "10px" }} htmlFor="medium">
                    Medium
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="large"
                    value="Large"
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          large: {
                            selected: e.target.checked,
                            quantity: prev.sizes?.large?.quantity || 0,
                          },
                        },
                      }))
                    }
                  />
                  <label style={{ marginLeft: "10px" }} htmlFor="large">
                    Large
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="xl"
                    value="XL"
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          xl: {
                            selected: e.target.checked,
                            quantity: prev.sizes?.xl?.quantity || 0,
                          },
                        },
                      }))
                    }
                  />
                  <label style={{ marginLeft: "10px" }} htmlFor="xl">
                    XL
                  </label>
                </div>
              </div>

              {/* Quantity Column */}
              <div className={styles.column}>
                <div>
                  <label htmlFor="small-quantity">Quantity:</label>
                  <input
                    type="number"
                    id="small-quantity"
                    disabled={!currentProduct.sizes?.small?.selected}
                    value={currentProduct.sizes?.small?.quantity || ""}
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          small: {
                            ...prev.sizes.small,
                            quantity: Math.max(0, Number(e.target.value)),
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="medium-quantity">Quantity:</label>
                  <input
                    type="number"
                    id="medium-quantity"
                    disabled={!currentProduct.sizes?.medium?.selected}
                    value={currentProduct.sizes?.medium?.quantity || ""}
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          medium: {
                            ...prev.sizes.medium,
                            quantity: Math.max(0, Number(e.target.value)),
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="large-quantity">Quantity:</label>
                  <input
                    type="number"
                    id="large-quantity"
                    disabled={!currentProduct.sizes?.large?.selected}
                    value={currentProduct.sizes?.large?.quantity || ""}
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          large: {
                            ...prev.sizes.large,
                            quantity: Math.max(0, Number(e.target.value)),
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="xl-quantity">Quantity:</label>
                  <input
                    type="number"
                    id="xl-quantity"
                    disabled={!currentProduct.sizes?.xl?.selected}
                    value={currentProduct.sizes?.xl?.quantity || ""}
                    onChange={(e) =>
                      setCurrentProduct((prev) => ({
                        ...prev,
                        sizes: {
                          ...prev.sizes,
                          xl: {
                            ...prev.sizes.xl,
                            quantity: Math.max(0, Number(e.target.value)),
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <label>Front Image:</label>
              <input
                type="file"
                name="frontImage"
                id="frontImage"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    frontImage: e.target.files[0],
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Back Image:</label>
              <input
                type="file"
                name="backImage"
                id="backImage"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    backImage: e.target.files[0],
                  }))
                }
              />
            </div>
          </div>

          {/* Usage Information Section */}
          <div className={styles.column}>
            <h3 style={{ fontWeight: "bold" }}>Usage Information</h3>
            <div className={styles.row}>
              <label>Usage Title:</label>
              <input
                type="text"
                value={currentProduct.usageTitle || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    usageTitle: e.target.value,
                  }))
                }
              />
            </div>
            <h4 style={{ fontWeight: "bold" }}>Steps</h4>
            <h4>First</h4>
            <div className={styles.row}>
              <label>Step Title:</label>
              <input
                type="text"
                value={currentProduct.stepTitle1 || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepTitle1: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Description:</label>
              <input
                type="text"
                value={currentProduct.stepDescription1 || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepDescription1: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Image:</label>
              <input
                name="step1Image"
                id="step1Image"
                type="file"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepImage1: e.target.files[0],
                  }))
                }
              />
            </div>
            <h4 style={{ fontWeight: 'bold' }}>Second</h4>
            <div className={styles.row}>
              <label>Step Title:</label>
              <input
                type="text"
                value={currentProduct.stepTitle2 || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepTitle2: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Description:</label>
              <input
                type="text"
                value={currentProduct.stepDescription2 || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepDescription2: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Image:</label>
              <input
                name="step2Image"
                id="step2Image"
                type="file"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepImage2: e.target.files[0],
                  }))
                }
              />
            </div>
            <h4 style={{ fontWeight: 'bold' }}>Third</h4>
            <div className={styles.row}>
              <label>Step Title:</label>
              <input
                type="text"
                value={currentProduct.stepTitle3 || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepTitle3: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Description:</label>
              <input
                type="text"
                value={currentProduct.stepDescription3 || ""}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepDescription3: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Image:</label>
              <input
                name="step3Image"
                id="step3Image"
                type="file"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepImage3: e.target.files[0],
                  }))
                }
              />
            </div>
            <button className={styles.submitButton} onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
