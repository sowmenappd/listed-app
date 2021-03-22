import { useEffect, useState } from "react";
import jwt from "jwt-simple";
import axios from "axios";

import "./App.css";
import MainScreen from "./Screens/MainScreen";
import AuthScreen from "./Screens/AuthScreen";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("triggered effect");

    if (token !== "" && token.length > 10) {
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
      const _u = jwt.decode(token, process.env.REACT_APP_SRV_SECRET);
      if (_u) {
        setUser(_u);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const handleToken = (t) => {
    setToken(t);

    //if logging out or rememberMe is true, then set this
    if (t === "") localStorage.setItem("token", t);
  };

  return (
    <>
      {!user ? (
        <AuthScreen onToken={handleToken} />
      ) : (
        <MainScreen user={user} onLogout={handleToken} />
      )}
    </>
  );
};

export default App;
