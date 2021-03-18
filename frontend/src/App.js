import { useEffect, useState } from "react";
import jwt from "jwt-simple";
import axios from "axios";

import "./App.css";
import MainScreen from "./Screens/MainScreen";
import AuthScreen from "./Screens/AuthScreen";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _t = localStorage.getItem("token") || null;
    const tk = _t || token;

    if (tk && tk.length > 0) {
      axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("token");

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
        },
        (error) => Promise.reject(error)
      );
      const _u = jwt.decode(tk, process.env.REACT_APP_SRV_SECRET);
      if (_u) {
        setUser(_u);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const handleToken = (t) => {
    setToken(t);
    localStorage.setItem("token", t || "");
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
