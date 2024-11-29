import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from "../components/Alerts/Delete";
import BlogModal from "../components/Modals/Blog";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function AddBlogs() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/blog");
        if (response.data && response.data.length > 0) {
          setBlogs(response.data);
        } else {
          alert("No Blogs found");
        }
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/blog/${blogToDelete._id}`);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((b) => b._id !== blogToDelete._id)
      );
      setShowDeleteAlert(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Blogs</h1>
          <button onClick={() => setShowModal(true)}>Add Blog</button>
        </div>
        <div className={styles.blogs}>
          <div className={styles.bloggrid}>
            <div className={`${styles.header} ${styles.productname}`}>
              Blog No.
            </div>
            <div className={`${styles.header} ${styles.productname}`}>
              Blog Image
            </div>
            <div className={`${styles.header} ${styles.productprice}`}>
              Blog Name
            </div>
            <div className={`${styles.header} ${styles.productname}`}>
              Blog Text
            </div>
            <div className={`${styles.header} ${styles.productoperations}`}>
              Operations
            </div>

            {blogs.map((blog, index) => (
              <React.Fragment key={blog._id}>
                <div
                  className={`${styles.productno} ${styles.productdescription}`}
                >
                  {index + 1}
                </div>
                <div
                  className={`${styles.productname} ${styles.productdescription}`}
                >
                  <img
                    className={`${styles.blogimg}`}
                    src={blog.image}
                    alt={blog.blogName}
                    crossOrigin={
                      blog.image.startsWith("http://localhost:3001")
                        ? "anonymous"
                        : undefined
                    }
                  />
                </div>
                <div
                  className={`${styles.productprice} ${styles.productdescription}`}
                >
                  {blog.blogName}
                </div>
                <div
                  className={`${styles.productprice} ${styles.productdescription}`}
                >
                  {blog.text}
                </div>
                <div
                  className={`${styles.productoperations} ${styles.productdescription}`}
                >
                  <button
                    className={styles.updatebtn}
                    onClick={() => handleUpdateClick(blog)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.deletebtn}
                    onClick={() => handleDeleteClick(blog)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {showModal && (
          <BlogModal
            onClose={() => {
              setShowModal(false);
            }}
            blog={selectedBlog}
          />
        )}

        {showDeleteAlert && (
          <Delete
            text="Blog"
            obj={blogToDelete.blogName}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}
