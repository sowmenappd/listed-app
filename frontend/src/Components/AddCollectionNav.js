import React, { useState } from "react";
import { Button, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { Input } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const AddCollectionNav = ({ onAdd }) => {
  const [name, setName] = useState("");

  return (
    <Collapse
      //   onChange={callback}
      style={{
        backgroundColor: "#191716",
        borderWidth: 0,
      }}
    >
      <Panel
        showArrow={false}
        header={<Header />}
        key="1"
        style={{ borderWidth: 0 }}
      >
        <Title level={5}>Name of collection</Title>
        <Input
          placeholder="New collection title"
          allowClear
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onPressEnter={() => {
            if (!name || name.length < 4) return;
            onAdd?.({ name, userId: "60491df3f8e08af8c3126e09" });
            setName("");
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 10,
          }}
        >
          <Button
            disabled={name.length < 4}
            type="primary"
            onClick={() => {
              setName("");
              onAdd?.({ name, userId: "60491df3f8e08af8c3126e09" });
            }}
          >
            Add
          </Button>
        </div>
      </Panel>
    </Collapse>
  );
};

const Header = () => (
  <Title
    style={{
      paddingLeft: 10,
      lineHeight: 0,
      marginBottom: 0,
      color: "#fffafa",
      fontWeight: "normal",
    }}
    ellipsis
  >
    <PlusSquareOutlined
      style={{
        marginRight: 12,
      }}
    />
    Add collection
  </Title>
);

export default AddCollectionNav;
