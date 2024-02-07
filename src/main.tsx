import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Retrieved from "./routes/retrieved.tsx";
import AddItem from "./routes/addItem.tsx";
//import Nav from "./components/nav.tsx";
import InventoryItem from "./routes/inventoryItem.tsx";
import Inventory from "./routes/inventory.tsx";
import { ToastContainer } from "react-toastify";
import RetrievedItem from "./routes/retrievedItem.tsx";
//import Login from "./components/Login";
//import { isAuthenticated } from "./services/authService";
import Login from "./routes/login.tsx";
//import { isAuthenticated } from "./components/authService.tsx";
import { useAuth, AuthProvider } from "./authContext.tsx";
import Nav from "./components/nav.tsx";

// const Main = () => {
// const { isAuthenticated, setAuthenticated } = useAuth();
// const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
// // useEffect(() => {
// //   const checkAuthentication = async () => {
// //     try {
// //       const authState = await checkAuth();
// //       console.log("is authenticated", authState);
// //       setIsUserAuthenticated(authState);
// //     } catch (error) {
// //       console.error("Error checking authentication:", error);
// //     }
// //   };

// //   checkAuthentication();
// // }, [isAuthenticated, setAuthenticated]);

// useEffect(() => {
//   isAuthenticated && setIsUserAuthenticated(isAuthenticated);
//   console.log("is authenticated form log in", isAuthenticated);
// }, [isAuthenticated, setAuthenticated]);

// useEffect(() => {
//   console.log("is user authenticated", isAuthenticated);
//   isUserAuthenticated && redirect("/");
// }, [isUserAuthenticated, isAuthenticated, setAuthenticated]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: isUserAuthenticated ? <Root /> : <Login />,
//     errorElement: <ErrorPage />,

//     children: [
//       {
//         path: "/inventory/",
//         element: isUserAuthenticated ? <Inventory /> : <Login />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "/inventory/:id",
//         element: isUserAuthenticated ? <InventoryItem /> : <Login />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "/retrieved/:id",
//         element: isUserAuthenticated ? <RetrievedItem /> : <Login />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "/retrieved",
//         element: isUserAuthenticated ? <Retrieved /> : <Login />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "/add-item",
//         element: isUserAuthenticated ? <AddItem /> : <Login />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "/",
//         element: isUserAuthenticated ? (
//           <Navigate to="/inventory" replace={true} />
//         ) : (
//           <Navigate to="/inventory" replace={true} />
//         ),
//       },
//     ],
//   },
// ]);

//   return <React.StrictMode></React.StrictMode>;
// };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
