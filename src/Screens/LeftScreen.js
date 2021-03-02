import React from "react";
import { Input, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LeftScreen = () => {
  return (
    <>
      <Row>
        <Col
          span={15}
          offset={3}
          style={{
            marginTop: 100,
            justifySelf: "center",
          }}
        >
          <Input
            size="large"
            type="text"
            // value="sowmen"
            placeholder="search in lists"
            prefix={
              <UserOutlined
                style={{ fontSize: 48, color: "white", paddingRight: 10 }}
              />
            }
            bordered={false}
            color="white"
          />
        </Col>
      </Row>
    </>
  );
};

export default LeftScreen;
