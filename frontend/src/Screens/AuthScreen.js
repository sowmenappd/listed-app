import axios from "axios";
import { open } from "tauri/api/window";
import React, { useRef, useState } from "react";
import { Button, Col, Divider, notification, Row, Typography } from "antd";
import Logo from "../Components/Logo";

import {
  GithubFilled,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";

import LoginComponent from "../Components/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent";
import WelcomeAnimation from "../Components/WelcomeAnimation";

import config from "../config";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Text } = Typography;

const GITHUB_URL = "https://github.com/sowmenappd";
const FACEBOOK_URL = "https://facebook.com/sowmen.rahman.01";
const INSTAGRAM_URL = "https://www.instagram.com/sowmen.r1/";

const AuthScreen = ({ onToken, onRemember }) => {
  const cRef = useRef(null);
  const [page, setPage] = useState("login");
  const screensX = useBreakpoint();

  const displaySecond = screensX.xl || screensX.xll;

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
          onRemember?.(true);
        }
        onToken?.(token);
        onRemember?.(false);
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
        onRemember?.(values.rememberMe === true);
        onToken?.(token);
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
    <div>
      <Row style={{ height: "100vh" }}>
        <Col {...layoutProps("#191716")} span={displaySecond ? 12 : 24}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!displaySecond && <Logo />}
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
          <div
            style={{
              bottom: 20,
              position: "absolute",
              width: 200,
              height: 60,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Button
                type="link"
                style={{ fontSize: 24, color: "blueviolet" }}
                onClick={() => open(GITHUB_URL)}
              >
                <GithubFilled size={40} />
              </Button>
              <Button
                type="link"
                style={{ fontSize: 24, color: "blueviolet" }}
                onClick={() => open(FACEBOOK_URL)}
              >
                <FacebookFilled />
              </Button>
              <Button
                type="link"
                style={{ fontSize: 24, color: "blueviolet" }}
                onClick={() => open(INSTAGRAM_URL)}
              >
                <InstagramFilled />
              </Button>
            </div>
            <Text strong style={{ color: "white", fontSize: 16 }}>
              Sowmen Rahman © 2021
            </Text>
          </div>
        </Col>
        {displaySecond && (
          <Col {...layoutProps("#fafaff")} span={displaySecond ? 12 : 0}>
            <div
              style={{
                position: "fixed",
                top: 160,
                paddingLeft: 30,
                display: "flex",
              }}
            >
              <Logo />
            </div>

            <WelcomeAnimation carouselRef={cRef} marginTop={140} />
          </Col>
        )}
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
  };
};

export default AuthScreen;
