import { useEffect, useState } from "react";
import styles from './style.module.css'

export default function UpdateModal({ show, onClose, product }) {
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    detail: "",
    subsection: "",
    price: "",
  });
  useEffect(() => {
    if (product) {
      setCurrentProduct({
        name: product.name,
        description: product.description,
        subsection: product.subsection,
        detail: product.detail,
        price: product.price,
      });
    }
  }, [product]);

  if (!show) return null;

  const handleSubmit = () => {
    // onUpdate({ ...productData, name: productName, price });
    // onClose();
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <span className={styles.closeicon} onClick={onClose}>
          &times;
        </span>
        <div className={styles.flexContainer}>
          {/* Product Information Section */}
          <div className={styles.column}>
            <h3 style={{ fontWeight: 'bold' }}>Product Information</h3>
            <div className={styles.row}>
              <label>Name:</label>
              <input
                type="text"
                value={currentProduct.name || ''}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Detail:</label>
              <input
                type="text"
                value={currentProduct.detail || ''}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({ ...prev, detail: e.target.value }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Sub Section:</label>
              <input
                type="text"
                value={currentProduct.subsection || ''}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({ ...prev, subsection: e.target.value }))
                }
              />
            </div>
            <div className={styles.row}>
              <label>Description:</label>
              <input
                type="text"
                value={currentProduct.description || ''}
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
              <label style={{ marginLeft: '10px' }}>Stock:</label>
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
            <h4 style={{ fontWeight: 'bold' }}>Sizes and Quantity</h4>
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
                  <label style={{ marginLeft: '10px' }} htmlFor="small">Small</label>
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
                  <label style={{ marginLeft: '10px' }} htmlFor="medium">Medium</label>
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
                  <label style={{ marginLeft: '10px' }} htmlFor="large">Large</label>
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
                  <label style={{ marginLeft: '10px' }} htmlFor="xl">XL</label>
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
                    value={currentProduct.sizes?.small?.quantity || ''}
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
                    value={currentProduct.sizes?.medium?.quantity || ''}
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
                    value={currentProduct.sizes?.large?.quantity || ''}
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
                    value={currentProduct.sizes?.xl?.quantity || ''}
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
            <h3 style={{ fontWeight: 'bold' }}>Usage Information</h3>
            <div className={styles.row}>
              <label>Usage Title:</label>
              <input
                type="text"
                value={currentProduct.usageTitle || ''}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    usageTitle: e.target.value,
                  }))
                }
              />
            </div>
            <h4 style={{ fontWeight: 'bold' }}>Steps</h4>
            <h4>First</h4>
            <div className={styles.row}>
              <label>Step Title:</label>
              <input
                type="text"
                value={currentProduct.stepTitle1 || ''}
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
                value={currentProduct.stepDescription1 || ''}
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
                type="file"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepImage1: e.target.files[0],
                  }))
                }
              />
            </div>
            <h4>Second</h4>
            <div className={styles.row}>
              <label>Step Title:</label>
              <input
                type="text"
                value={currentProduct.stepTitle2 || ''}
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
                value={currentProduct.stepDescription2 || ''}
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
                type="file"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepImage2: e.target.files[0],
                  }))
                }
              />
            </div>
            <h4>Third</h4>
            <div className={styles.row}>
              <label>Step Title:</label>
              <input
                type="text"
                value={currentProduct.stepTitle3 || ''}
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
                value={currentProduct.stepDescription3 || ''}
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
                type="file"
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    stepImage3: e.target.files[0],
                  }))
                }
              />
            </div>
            <button className={styles.submitButton} onClick={handleSubmit}>Update Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
