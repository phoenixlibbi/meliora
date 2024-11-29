import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CustomAlert from "../../components/CustomAlert";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", text: "", open: false });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const validateName = (name) => {
    if (!name) return "Name is required.";
    if (/^[^a-zA-Z]/.test(name)) return "Name must start with alphabets only.";
    if (name.length < 3) return "Name must be at least 3 characters long.";
    if (/[^a-zA-Z\s]/.test(name))
      return "Name must contain only alphabets and spaces.";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address.";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain at least one special character.";
    if (formData.name && password.includes(formData.name))
      return "Password must not contain your name for security reasons.";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name")
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({ name: nameError, email: emailError, password: passwordError });

    if (nameError || emailError || passwordError) {
      setAlert({
        type: "error",
        text: "Please fix the errors in the form.",
        open: true,
      });
      return;
    }

    try {
      const response = await axios.post("/auth/user/signup", formData);

      if (response.status === 201) {
        const { accessToken, refreshToken, user } = response.data;
        await login(user, accessToken, refreshToken);

        setAlert({
          type: "success",
          text: "Sign up successful! Redirecting...",
          open: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlert({
          type: "error",
          text: "User already exists. Please log in.",
          open: true,
        });
      } else {
        setAlert({
          type: "error",
          text: "An error occurred. Please try again later.",
          open: true,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      {alert.open && (
        <CustomAlert
          type={alert.type}
          text={alert.text}
          show={alert.open}
          onClose={handleCloseAlert}
        />
      )}
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor='name' className={styles.label}>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className={`${styles.input} ${
                formData.name && !errors.name ? styles.valid : styles.invalid
              }`}
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Enter your name'
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='email' className={styles.label}>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`${styles.input} ${
                formData.email && !errors.email ? styles.valid : styles.invalid
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
                formData.password && !errors.password
                  ? styles.valid
                  : styles.invalid
              }`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <button type='submit' className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.redirectText}>
          Already Registered?{" "}
          <span
            className={styles.link}
            onClick={() => {
              navigate("/signin");
            }}>
            Sign In
          </span>
        </p>

        <div className={styles.socialContainer}>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.google}`}>
            Sign up with Google
          </button>
          <button
            type='button'
            className={`${styles.socialButton} ${styles.facebook}`}>
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
