import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const Logo = ({ marginBottom = 0 }) => {
  return (
    <>
      <Title
        level={1}
        style={{
          color: "#191716",
          float: "right",
          fontSize: 72,
          marginBottom: marginBottom,
          fontWeight: "bolder",
        }}
      >
        <span style={{ color: "blueviolet" }}>list</span>
        <span style={{ color: "darkmagenta" }}>ed</span>
        <Text style={{ color: "#E6AF2E", fontSize: 84, lineHeight: 0 }}>.</Text>
      </Title>
    </>
  );
};

export default Logo;
