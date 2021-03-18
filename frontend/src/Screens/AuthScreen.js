import axios from "axios";
import React, { useRef, useState } from "react";
import { Col, notification, Row } from "antd";
import Logo from "../Components/Logo";

import LoginComponent from "../Components/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent";
import WelcomeAnimation from "../Components/WelcomeAnimation";

import config from "../config";

const AuthScreen = ({ onToken }) => {
  const cRef = useRef(null);
  const [page, setPage] = useState("login");
  const handleNavigation = (page) => {
    setPage(page);
    cRef.current.goTo(page === "login" ? 0 : 1);
  };

  const handleLogin = async (values) => {
    try {
      const {
        data: { token },
      } = await axios.post(`${config.apiBaseUrl}/auth/`, values);

      if (token !== null) {
        if (values.rememberMe === true) {
          localStorage.setItem("token", token);
        }
        onToken?.(token);
        return true;
      }
    } catch (ex) {
      console.log(ex.message);
      return false;
    }
  };

  const handleLoginResponse = (success) => {
    console.log(success);
    if (!success) {
      notification.error({
        message: "Invalid login.",
        description: "No user exists with these credentials.",
      });
    }
  };

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col {...layoutProps("#191716")}>
          <div
            style={{
              position: "fixed",
              top: 240,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {page === "login" ? (
              <LoginComponent
                onSubmit={handleLogin}
                onResponse={handleLoginResponse}
                onBackPressed={handleNavigation}
              />
            ) : (
              <RegisterComponent
                onSubmit={null}
                onBackPressed={handleNavigation}
              />
            )}
          </div>
        </Col>
        <Col {...layoutProps("#fafaff")}>
          <div
            style={{
              position: "fixed",
              top: 80,
              paddingLeft: 30,
            }}
          >
            <Logo />
          </div>
          <WelcomeAnimation carouselRef={cRef} />
        </Col>
      </Row>
    </div>
  );
};

const layoutProps = (bgColor) => {
  return {
    style: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor || "transparent",
    },
    span: 12,
  };
};

export default AuthScreen;
