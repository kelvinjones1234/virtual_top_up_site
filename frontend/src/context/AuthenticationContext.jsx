import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "./GeneralContext";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { api } = useContext(GeneralContext);
  const [userError, setUserError] = useState("");
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    transaction_pin: "",
  });

  useEffect(() => {
    // Fetch user data
    api
      .get("user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [authTokens.access]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
      }
    }, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authTokens]);

  const loginUser = async (username, password) => {
    try {
      const response = await api.post(
        "token/",
        {
          username: username.toLowerCase(),
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));

        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/user/dashboard");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      setUserError(error.response.data.detail);

      console.error(
        "Error:",
        error.response ? error.response.data.detail : error.message
      );
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await api.post("authentication/register/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        navigate("/authentication/login");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const refreshToken = async () => {
    try {
      const response = await api.post(
        "token/refresh/",
        { refresh: authTokens.refresh },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error(
        "Error refreshing token:",
        error.response ? error.response.data : error.message
      );
      logoutUser();
    }
  };

  const logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/authentication/login");
  };

  const contextData = {
    loginUser,
    logoutUser,
    registerUser,
    setUserError,
    setUserData,
    userData,
    user,
    userError,
    authTokens,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
