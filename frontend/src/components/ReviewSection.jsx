import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";

axios.defaults.baseURL = "http://localhost:3001";

export default function ReviewSection({ product }) {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState({});
  const [customer, setCustomer] = useState({});
  const [stars, setStars] = useState(1);
  const [reviv, setReview] = useState("");

  // Handle stars
  const incrementStars = () => {
    if (stars < 5) setStars(stars + 1);
  };
  const decrementStars = () => {
    if (stars > 1) setStars(stars - 1);
  };
  const starCounts = [1, 2, 3, 4, 5].reduce((counts, star) => {
    counts[star] = reviews.filter((review) => review.stars === star).length;
    return counts;
  }, {});

  const handleReviewSubmission = () => {
    const reviewObject = {
      customerId: customer._id,
      productId: product._id,
      review: reviv.trim(),
      stars: stars,
    };
    try {
      axios.post("/review/", reviewObject).then((response) => {
        if (response.data) {
          setReviews((prevReviews) => [response.data.review, ...prevReviews]);
        } else {
          console.error("Error submitting review:", response);
        }
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setReview("");
    setStars(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewResponse = await axios.get(
          `/review/product/${product._id}`
        );
        if (reviewResponse.data) {
          setReviews(reviewResponse.data);
          // Fetch customer details for each review
          for (const review of reviewResponse.data) {
            const customerResponse = await axios.get(
              `/customers/${review.customerId}`
            );
            setCustomers((prevCustomers) => ({
              ...prevCustomers,
              [review.customerId]: customerResponse.data,
            }));
          }
        } else {
          console.error("No reviews found for product with Id:", product._id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        if (isAuthenticated) {
          const customerResponse = await axios.get(
            `/customers/email/${user.email}`
          );
          if (customerResponse.data) {
            setCustomer(customerResponse.data);
          } else {
            console.error("No customer found with Email:", user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchData();
  }, [product._id, isAuthenticated, user]);

  const totalReviews = reviews.length;
  const calculatePercentage = (count) => {
    return totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : 0;
  };

  return (
    <div className={styles.reviewsection}>
      <h2 style={{ padding: "15px 0px" }}>Customer Reviews</h2>
      <div className={styles.header}>
        <div className={styles.ratingsummary}>
          <span className={styles.stars}>★★★★☆</span>
          <span>
            {totalReviews > 0
              ? (
                  reviews.reduce((sum, review) => sum + review.stars, 0) /
                  totalReviews
                ).toFixed(1)
              : 0}{" "}
            out of 5
          </span>
          <p>Based on {totalReviews} Reviews</p>
        </div>
        <div className={styles.ratingbreakdown}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className={styles.ratingbar}>
              <span className={styles.stars}>{"★".repeat(star)}</span>
              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${calculatePercentage(starCounts[star])}%`,
                  }}></div>
              </div>
              <span>{starCounts[star]}</span>
            </div>
          ))}
        </div>
        <div className={styles.reviewcontainer}>
          <textarea
            className={styles.textarea}
            placeholder='Write your review here...'
            value={reviv}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className={styles.starsContainer}>
            <button onClick={decrementStars} className={styles.button}>
              -
            </button>
            <span className={styles.stars}>{stars} ★</span>
            <button onClick={incrementStars} className={styles.button}>
              +
            </button>
          </div>
          <button
            className={styles.postButton}
            onClick={handleReviewSubmission}
            disabled={
              !reviv.trim() || !customer._id || !product._id || !isAuthenticated
            }>
            Post Review
          </button>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className={styles.review}>
          {reviews.map((rev) => (
            <div key={rev._id} className={styles.review}>
              <div className={styles.reviewheader}>
                <div className={styles.topheading}>
                  <h4>{customers[rev.customerId]?.name || "Loading..."}</h4>
                  {customers[rev.customerId]?.isVerified ? (
                    <span className={styles.verified}>Verified</span>
                  ) : (
                    <span
                      className={styles.verified}
                      style={{ backgroundColor: "red" }}>
                      Not Verified
                    </span>
                  )}
                  <p>
                    {Array.from({ length: Number(rev.stars) || 0 }).map(
                      (_, index) => (
                        <span key={index} className={styles.stars}>
                          ★
                        </span>
                      )
                    )}
                  </p>
                </div>
              </div>
              <div className={styles.reviewcontent}>
                <h5>{rev.review || "No Review Provided"}</h5>
                <p>
                  Location:{" "}
                  {customers[rev.customerId]?.address.city || "Loading..."},
                  {customers[rev.customerId]?.address.country || "Loading..."}
                </p>
                <p>Created At: {rev.createdAt || "Not specified"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Made by Zain Manzoor */
/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */
