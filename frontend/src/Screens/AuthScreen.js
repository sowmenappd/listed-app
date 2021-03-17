import React from "react";
import { Col, Input, Space, Row } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import Logo from "../Components/Logo";
import LoginForm from "../Components/LoginForm";

const { Group } = Input;

const AuthScreen = () => {
  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col
          style={{
            backgroundColor: "#191716",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          span={12}
        >
          <div style={{ position: "absolute", top: 100 }}>
            <Logo />
          </div>
          <div style={{ position: "absolute", top: 300 }}>
            <span style={{ color: "blueviolet", fontSize: 50 }}>Log</span>
            <span style={{ color: "darkmagenta", fontSize: 50 }}>in</span>
          </div>
          <div style={{ position: "absolute", top: 400 }}>
            <LoginForm />
          </div>
        </Col>
        <Col
          style={{
            backgroundColor: "#fafaff",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          span={12}
        >
          <div
            style={{
              alignItems: "center",
            }}
          >
            <Space direction="vertical">
              <div
                style={{
                  position: "absolute",
                  top: 280,
                  display: "flex",
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "darkmagenta", fontSize: 50 }}>Sign</span>
                <span style={{ color: "blueviolet", fontSize: 50 }}>up</span>
              </div>
              <Group
                style={{ marginTop: 40, paddingLeft: 80, paddingRight: 80 }}
              >
                <Input
                  type="email"
                  placeholder="E-mail"
                  style={{ fontSize: 30, marginBottom: 10 }}
                  size="large"
                />
                <Input.Password
                  type="password"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  style={{ fontSize: 30, marginTop: 10, marginBottom: 10 }}
                  size="large"
                />
                <Input.Password
                  type="password"
                  placeholder="C Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  style={{ fontSize: 30, marginTop: 10 }}
                  size="large"
                />
              </Group>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthScreen;
