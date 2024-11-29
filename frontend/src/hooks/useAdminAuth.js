import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:3001";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAccessTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Invalid JWT token", error);
      return true;
    }
  };

  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem("user", JSON.stringify(userData));

    Cookies.set("accessToken", accessToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
      httpOnly: true,
    });

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      logout();
      return;
    }

    try {
      // Check the refresh token validity
      const refreshResponse = await axios.post(
        "/auth/token/verify",
        { token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add access token as Bearer token
            "token-type": "access", // Add the token-type header as specified
            "Content-Type": "application/json", // Standard Content-Type header
          },
        }
      );

      if (
        refreshResponse.status === 200 &&
        refreshResponse.data.message === "Token is valid"
      ) {
        if (isAccessTokenExpired(accessToken)) {
          // If the access token is expired, request a new one using the refresh token
          const newTokenResponse = await axios.post(
            "/auth/token/refresh",
            { token: refreshToken },
            {
              headers: {
                "Content-Type": "application/json", // Content-Type for the refresh token request
              },
            }
          );

          const newAccessToken = newTokenResponse.data.accessToken;
          Cookies.set("accessToken", newAccessToken); // Store the new access token
          setIsAuthenticated(true); // Set as authenticated
        } else {
          setIsAuthenticated(true); // Token is valid, set as authenticated
        }
      } else {
        logout(); // If the refresh token is invalid, log out the user
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      logout(); // If there's an error in the authentication check, log out the user
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setIsAuthenticated(!!Cookies.get("accessToken"));
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
};

export default useAuth;
