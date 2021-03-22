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
  const handleNavigation = (page, delay = false) => {
    setPage(page);
    const handler = () => cRef.current.goTo(page === "login" ? 0 : 1);
    if (delay) {
      setTimeout(handler, 1000);
    } else {
      handler();
    }
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
      return false;
    }
  };

  const handleLoginResponse = (success) => {
    if (!success) {
      notification.error({
        message: "Invalid login.",
        description: "No user exists with these credentials.",
      });
    }
  };

  const handleSignup = async (values) => {
    if (values.password !== values.cpass) {
      notification.error({
        message: "Passwords do not match",
        placement: "bottomLeft",
      });
      return false;
    }
    try {
      const {
        data: { token },
      } = await axios.post(`${config.apiBaseUrl}/auth/signup`, values);

      if (token !== null) {
        if (values.rememberMe === true) {
          localStorage.setItem("token", token);
        }
        onToken?.(token || "");
        return true;
      }
    } catch (ex) {
      return false;
    }
  };

  const handleSignupResponse = (success) => {
    if (success) {
      notification.success({
        message: "Account created successfully!",
        description: "You can sign in with your credentials.",
      });
      handleNavigation("login", true);
    } else {
      notification.error({
        message: "Invalid signup attempt.",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "brown", height: "100vh", width: "100vw" }}>
      <Row style={{ display: "flex", flex: 1, height: "100%" }}>
        <Col {...layoutProps("#191716")}>
          <div
            style={{
              top: 240,
              width: "80%",
              flexDirection: "column",
              justifyContent: "center",
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
                onSubmit={handleSignup}
                onResponse={handleSignupResponse}
                onBackPressed={handleNavigation}
              />
            )}
          </div>
        </Col>
        <Col {...layoutProps("#fafaff")}>
          <Logo style={{ marginLeft: 20 }} />
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor || "transparent",
    },
    span: 12,
  };
};

export default AuthScreen;
