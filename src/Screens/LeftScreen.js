import React from "react";
import { Col, Row } from "antd";

import SearchBar from "../Components/SearchBar";

const LeftScreen = () => {
  return (
    <>
      <Row>
        <ContextColumn>
          <SearchBar />
        </ContextColumn>
      </Row>
      <Row>
        <ContextColumn marginTop={200}></ContextColumn>
      </Row>
    </>
  );
};

const ContextColumn = ({ marginTop, children }) => {
  return (
    <Col
      span={18}
      offset={3}
      style={{
        marginTop: marginTop || 100,
        justifySelf: "center",
      }}
    >
      {children}
    </Col>
  );
};

export default LeftScreen;
