import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Account from "./pages/Account.jsx";
import AccountDetails from "./pages/AccountDetails.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import axios from "axios";
import AddProduct from "./pages/AddProduct.jsx";
import OrderList from "./pages/OrderList.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "https://footwear-store-api.onrender.com/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        )
      },
      {
        path: "/account/:id",
        element: (
          <PrivateRoute>
            <AccountDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        )
      },
      {
        path: "/add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        )
      },
      {
        path: "/order-list/:id",
        element: (
          <PrivateRoute>
            <OrderList />
          </PrivateRoute>
        )
      },
      {
        path: "contact-us",
        element: <Contact />
      },
      {
        path: "about-us",
        element: <About />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
