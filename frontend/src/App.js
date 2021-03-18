import "./App.css";
import MainScreen from "./Screens/MainScreen";
import AuthScreen from "./Screens/AuthScreen";
import { useEffect, useState } from "react";
import jwt from "jwt-simple";

const App = ({ props }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _t = localStorage.getItem("token") || null;
    const tk = _t || token;

    if (tk && tk.length > 0) {
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
