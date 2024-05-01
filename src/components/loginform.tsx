import { useEffect, useState } from "react";
//import { client } from "./authService";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import api, { baseUrl, client, login } from "./authService";

const LoginForm = ({ credentials, setCredentials }) => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit({ username, password });
  //   };
  // const { isAuthenticated, setAuthenticated } = useAuth();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();
  const login = async () => {
    console.log("gotten credentials", credentials);
    toast.dismiss();
    const loadingToastId = toast.info("Logging in...", {
      autoClose: false,
      hideProgressBar: false,
      isLoading: true,
    });
    try {
      const response = await axios.post(`${baseUrl}api/login/`, credentials);
      console.log("response is:", response.data); // The token and other data returned from the backend
      // Store the token in localStorage or elsewhere for future requests

      // Store the tokens in localStorage or elsewhere for future requests
      const token = response.data;
      if (token) {
        console.log(`token is ${token}`);
        localStorage.setItem("accessToken", token.access);
        localStorage.setItem("refreshToken", token.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.dismiss(loadingToastId);
        toast.success("Logged in successfully", { autoClose: 1000 });
        navigate("/");
        return;
      }
    } catch (error: Error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized (401) error
        // Handle the unauthorized error
        toast.dismiss(loadingToastId);

        // Display error message from API response
        toast.error("Invalid credentials", { autoClose: 2000 });
        //alert("Invalid credentials");
      } else {
        // Other error
        // Handle other errors
        //alert("An error occurred during login:");
        toast.dismiss(loadingToastId);
        toast.info(
          "Incorrect Credentials, \nplease provide your correct credentials",
          {
            autoClose: 3000,
            hideProgressBar: false,
            isLoading: false,
          }
        );
      }
      console.error(error);
      // Handle any error that occurs during the login request
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(credentials);
    login(credentials);
  };

  // useEffect(() => {
  //   console.log("after login", isAuthenticated);
  // }, [isAuthenticated, setAuthenticated]);

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col space-y-4 justify-center items-center w-[90%]"
    >
      <input
        type="text"
        placeholder="Username"
        className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 text-black bg-white focus:ring-[#efae31] w-[40%] sm:w-[100%]"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 bg-white text-black focus:ring-[#efae31] w-[40%] sm:w-[100%]"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-[#efae31] text-white rounded-md px-4 py-2 hover:bg-[#efaa31] w-[40%] sm:w-[100%]"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
