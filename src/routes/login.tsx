import { useEffect, useState } from "react";
import LoginForm from "../components/loginform";
import axios from "axios";
import { client } from "../components/authService";
import { useAuth, AuthProvider } from "../authContext";
import { toast } from "react-toastify";

const LoginView = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  //axios.defaults.xsrfCookieName = "csrftoken";
  //axios.defaults.xsrfHeaderName = "X-CSRFToken";
  //axios.defaults.withCredentials = true;

  //   const client = axios.create({
  //     baseURL: "http://localhost:8000",
  //   });

  //console.log("is authenticated", isAuthenticated);

  useEffect(() => {
    toast.dismiss();
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 flex-1 min-w-screen  w-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <LoginForm credentials={credentials} setCredentials={setCredentials} />
    </div>
  );
};

export default LoginView;
