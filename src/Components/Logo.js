import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const Logo = () => {
  return (
    <>
      <Title
        level={1}
        title="todo"
        style={{
          color: "#191716",
          float: "right",
          fontSize: 72,
          padding: 20,
          fontWeight: "bolder",
        }}
      >
        todo
        <Text style={{ color: "#E6AF2E", fontSize: 84, lineHeight: 0 }}>.</Text>
      </Title>
    </>
  );
};

export default Logo;
