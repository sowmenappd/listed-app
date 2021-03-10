import React from "react";
import { Button, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { Input } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const AddCollectionNav = () => {
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
          //   value={task}
          //   onChange={(e) => {
          //     setTask(e.target.value);
          //   }}
          //   onPressEnter={() => {
          //     if (!task.length) return;
          //     const newTasks = [...tasks, { id: tasks.length, name: task }];
          //     setTasks(newTasks);
          //     setTask("");
          //   }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 10,
          }}
        >
          <Button title="Create"> Create </Button>
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
