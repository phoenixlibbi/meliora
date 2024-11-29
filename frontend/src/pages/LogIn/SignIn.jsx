import React, { useState } from "react";
import styles from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CustomAlert from "../../components/CustomAlert";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", text: "", open: false });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate inputs
    if (name === "email") {
      if (value === "") {
        setErrors((prev) => ({ ...prev, email: "" }));
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prev) => ({
          ...prev,
          email: emailRegex.test(value) ? "" : "Invalid email address",
        }));
      }
    } else if (name === "password") {
      if (value === "") {
        setErrors((prev) => ({ ...prev, password: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password:
            value.length >= 6 ? "" : "Password must be at least 6 characters",
        }));
      }
    }
  };

  const isFieldValid = (field) => {
    return errors[field] === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "") {
      setAlert({ type: "error", text: "Please fill in email!", open: true });
      return;
    }

    if (formData.password === "") {
      setAlert({ type: "error", text: "Please fill in password!", open: true });
      return;
    }

    try {
      const response = await axios.post("/auth/user/signin", {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        await login(
          response.data.user,
          response.data.accessToken,
          response.data.refreshToken
        );
        setAlert({
          type: "success",
          text: "Sign in successful! Redirecting...",
          open: true,
        });
        setTimeout(() => navigate(location.state?.from || "/"), 1500);
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        setAlert({
          type: "warning",
          text: "Invalid email or password.",
          open: true,
        });
      } else {
        setAlert({
          type: "error",
          text: "Something went wrong. Please try again later.",
          open: true,
        });
      }
    }
  };

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      {alert.open && (
        <CustomAlert
          type={alert.type}
          text={alert.text}
          show={alert.open}
          onClose={handleCloseAlert}
        />
      )}
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign In</h1>
        <form method='POST' className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor='email' className={styles.label}>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`${styles.input} ${
                formData.email &&
                (isFieldValid("email") ? styles.valid : styles.invalid)
              }`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter your email'
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='password' className={styles.label}>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className={`${styles.input} ${
                formData.password &&
                (isFieldValid("password") ? styles.valid : styles.invalid)
              }`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input type='submit' className={styles.button} value='Sign In' />
          </div>
        </form>

        <p className={styles.redirectText}>
          Don't have an account?{" "}
          <span
            className={styles.link}
            onClick={() => {
              navigate("/signup");
            }}>
            Sign Up
          </span>
        </p>

        <div className={styles.socialContainer}>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.google}`}>
            Sign in with Google
          </button>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.facebook}`}>
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
