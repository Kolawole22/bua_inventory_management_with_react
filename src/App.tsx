import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { Children, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  defer,
  Navigate,
  redirect,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";

import AddItem from "./routes/addItem.tsx";
//import Nav from "./components/nav.tsx";
import InventoryItem from "./routes/inventoryItem.tsx";
import Inventory from "./routes/inventory.tsx";
import { ToastContainer } from "react-toastify";

//import Login from "./components/Login";
//import { isAuthenticated } from "./services/authService";
import Login from "./routes/login.tsx";
//import { isAuthenticated } from "./components/authService.tsx";
import { useAuth, AuthProvider } from "./authContext.tsx";
import Nav from "./components/nav.tsx";
import api from "./components/authService.tsx";

function App() {
  const [count, setCount] = useState(0);
  // const { isAuthenticated } = useAuth();
  // const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  // useEffect(() => {
  //   isAuthenticated && setIsUserAuthenticated(isAuthenticated);
  //   console.log("is authenticated form log in", isAuthenticated);
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   console.log("is user authenticated", isAuthenticated);
  //   isUserAuthenticated && redirect("/");
  // }, [isUserAuthenticated, isAuthenticated]);

  //const navigate = useNavigate();

  // const tokenData = localStorage.getItem("accessToken");
  // console.log("token data", tokenData);
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${tokenData}`,
  // };
  // const fetchAssignedInventory = async () => {
  //   try {
  //     const response = await api.get("api/inventory/assigned/", {
  //       headers: headers,
  //     });
  //     if (response.status != 200) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const dataPromise = response.data;
  //     //toast.su;
  //     return defer({ data: dataPromise });
  //   } catch (error) {
  //     console.error();
  //     //return redirect("/login/");
  //   }
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/inventory/",
          element: <Inventory />,
          errorElement: <ErrorPage />,
          //loader: fetchAssignedInventory,
        },
        {
          path: "/inventory/:id",
          element: <InventoryItem />,
          errorElement: <ErrorPage />,
        },

        {
          path: "/add-item",
          element: <AddItem />,
          errorElement: <ErrorPage />,
        },

        { path: "/", element: <Navigate to="/inventory" replace={true} /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
  ]);

  // Now, you can use the router in your component

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
