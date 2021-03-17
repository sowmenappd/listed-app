import React, { useState } from "react";
import { Col, Row } from "antd";
import Logo from "../Components/Logo";

import LoginComponent from "../Components/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent";

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

const AuthScreen = () => {
  const [page, setPage] = useState("login");
  const handleNavigation = (page) => {
    setPage(page);
  };
  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col {...layoutProps("#191716")}>
          <div style={{ position: "fixed", top: 40 }}>
            <Logo />
          </div>
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
                onSubmit={null}
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
        <Col {...layoutProps("#fafaff")}></Col>
      </Row>
    </div>
  );
};

export default AuthScreen;
