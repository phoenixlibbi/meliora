import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ProfileComponent from "./pages/Profile";
import SignIn from "./pages/LogIn/SignIn";
import SignUp from "./pages/LogIn/SignUp";
import OrderDetails from "./pages/OrderDetails";
import AdminSignIn from "./dashboard/pages/AdminSignIn";
import Admin from "./dashboard/pages/Admin";
import Dashboard from "./dashboard/pages/Dashboard";
import Order from "./dashboard/pages/Order";
import AddProducts from "./dashboard/pages/Product";
import Blog from "./dashboard/pages/Blog";
import Account from "./dashboard/pages/Account";
import Packages from "./dashboard/pages/Packages";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetails />,
  },
  {
    path: "/order-details/:id",
    element: (
      <ProtectedRoute>
        <Navbar />
        <OrderDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileComponent />
      </ProtectedRoute>
    ),
  },
  // Admin routes
  {
    path: "/admin",
    element: <AdminSignIn />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Dashboard />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Order />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/packages",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Packages />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <AddProducts />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/blogs",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Blog />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/account",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Account />
      </AdminProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
