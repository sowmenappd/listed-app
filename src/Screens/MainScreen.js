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
          overflowY: "hidden",
        }}
      >
        <Col style={{ backgroundColor: "#191716" }} span={6}>
          <LeftScreen />
        </Col>
        <Col style={{ backgroundColor: "#fafaff" }} span={18}>
          <RightScreen />
        </Col>
      </Row>
    </>
  );
};

export default MainScreen;
