// api.js

import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://192.168.108.160:8000/",
});

const setupInterceptors = (navigate) => {
  api.interceptors.response.use(
    // Response success handler
    (response) => {
      return response;
    },
    // Response error handler
    async (error) => {
      // Handle 401 Unauthorized responses
      if (error.response && error.response.status === 401) {
        console.log("getting refresh token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            // Make a refresh token request
            const refreshResponse = await axios.post(
              "http://127.0.0.1:8000/api/token/refresh/",
              {
                refresh: refreshToken,
              }
            );

            const newAccessToken = refreshResponse.data.access;

            // Store the new access token
            localStorage.setItem("accessToken", newAccessToken);

            // Retry the original request with the new access token
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios.request(error.config);
          } catch (refreshError) {
            console.error(refreshError);
            // Handle the error that occurs during token refreshing
            // For example, clear tokens and navigate to login page
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }
        } else {
          // No refresh token available, clear tokens and navigate to login page
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          console.log("redirecting");
          navigate("/login");
          return;
        }
      }

      return Promise.reject(error);
    }
  );
};

export { setupInterceptors }; // Export setupInterceptors for external use
export default api;
