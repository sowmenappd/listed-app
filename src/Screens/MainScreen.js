import React from "react";
import { Row, Col } from "antd";

import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";

const MainScreen = () => {
  return (
    <>
      <Row
        style={{
          height: "100vh",
        }}
      >
        <Col style={{ backgroundColor: "#191716" }} span={8}>
          <LeftScreen />
        </Col>
        <Col style={{ backgroundColor: "#fafaff" }} span={16}>
          <RightScreen />
        </Col>
      </Row>
    </>
  );
};

export default MainScreen;
