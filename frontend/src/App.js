import "./App.css";
import { useEffect, useState } from "react";
import jwt from "jwt-simple";
import axios from "axios";
import * as fs from "tauri/api/fs";

import MainScreen from "./Screens/MainScreen";
import AuthScreen from "./Screens/AuthScreen";

const App = () => {
  const [remember, setRemember] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handler = async () => {
      if (token && token.length > 10) {
        axios.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          },
          (error) => Promise.reject(error)
        );
        const _u = jwt.decode(token, process.env.REACT_APP_SRV_SECRET);
        if (_u) {
          if (remember) {
            let str = JSON.stringify({ token: token });
            await fs
              .writeBinaryFile({
                path: "./dat.file",
                contents: new TextEncoder().encode(str),
              })
              .catch((err) => {
                console.log(err);
              });
          }
          setUser(_u);
        }
      } else {
        if (token === "") await fs.removeFile("./dat.file");
        setUser(null);
      }
    };

    handler();
  }, [token]);

  useEffect(() => {
    fs.readBinaryFile("./dat.file")
      .then((vals) => {
        let arr = new Uint8Array(vals);
        let dec = JSON.parse(new TextDecoder("utf-8").decode(arr));
        if (dec.token && dec.token.length > 10) {
          setToken(dec.token);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleToken = (t) => {
    setToken(t);
  };

  return (
    <>
      {!user ? (
        <AuthScreen onToken={handleToken} onRemember={(v) => setRemember(v)} />
      ) : (
        <MainScreen user={user} onLogout={handleToken} />
      )}
    </>
  );
};

export default App;
