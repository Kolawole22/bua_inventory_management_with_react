// // ... (other imports)

// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { client } from "./components/authService";

// const AuthContext = createContext(undefined);
// // isAuthenticated: false,
// // setAuthenticated: () => {}, // Provide a default function

// //axios.defaults.xsrfCookieName = "csrftoken";
// //axios.defaults.xsrfHeaderName = "X-CSRFToken";
// //axios.defaults.withCredentials = true;

// //console.log("client", client);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   // if (!context) {
//   //   throw new Error("useAuth must be used within an AuthProvider");
//   // }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setAuthenticated] = useState();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await client.get("/api/check-auth/");
//         console.log("auth state", response.data);
//         setAuthenticated(response.data.logged_in);
//         return response.data.logged_in;
//       } catch (error) {
//         console.error("Authentication error:", error);
//         return false;
//       }
//     };
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     console.log("after login", isAuthenticated);
//   }, [isAuthenticated, setAuthenticated]);

//   // Add a response interceptor
//   client.interceptors.response.use(
//     (response) => {
//       // If the response status is 401, handle session expiration
//       if (response.status === 401) {
//         // Log out the user or perform any other action
//         handleSessionExpiration(setAuthenticated);
//       }

//       return response;
//     },
//     (error) => {
//       // If the response status is 401, handle session expiration
//       if (error.response && error.response.status === 401) {
//         // Log out the user or perform any other action
//         handleSessionExpiration(setAuthenticated);
//       }

//       return Promise.reject(error);
//     }
//   );

//   // Handle session expiration
//   const handleSessionExpiration = (setAuthenticated) => {
//     // Log out the user or perform any other action
//     console.log("Session expired. Logging out...");
//     // Example: Redirect to the login page or show a modal
//     // history.push("/login");
//     //setAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
