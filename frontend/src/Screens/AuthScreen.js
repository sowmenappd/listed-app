import React from "react";
import { Col, Input, Space, Row } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import Logo from "../Components/Logo";
import LoginComponent from "../Components/LoginComponent";

const { Group } = Input;

const colStyle = {};

const layoutProps = {
  style: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191716",
  },
  span: 12,
};

const AuthScreen = () => {
  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col {...layoutProps}>
          <div style={{ position: "absolute", top: 100 }}>
            <Logo />
          </div>
          <LoginComponent onSubmit={null} />
        </Col>
        <Col
          style={{
            ...colStyle,
            backgroundColor: "#fafaff",
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
