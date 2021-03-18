import React from "react";
import { Avatar, Button, Card, Col, Row, Typography } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

import SearchBar from "../Components/SearchBar";
import AddCollectionNav from "../Components/AddCollectionNav";
import TodoCollectionNav from "../Components/TodoCollectionNav";
import AddTodoNav from "../Components/AddTodoNav";

const { Text } = Typography;

const LeftScreen = ({
  collections,
  tasks,
  task,
  onAddCollection,
  onSearch,
  onSelectCollection,
  onTodoAdd,
  onTaskAdd,
  onTaskDelete,
  onTaskTitleEdit,
  onTaskListClear,
  addingTodoActivity,
  user,
  onLogout,
}) => {
  return (
    <>
      <Row
        style={{
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <ContextColumn marginTop={10}>
          <SearchBar onSearch={onSearch} />
        </ContextColumn>
      </Row>
      <Row>
        <ContextColumn marginTop={30}>
          <AddCollectionNav onAdd={onAddCollection} user={user} />
        </ContextColumn>
      </Row>
      <Row>
        <ContextColumn marginTop={1}>
          <TodoCollectionNav
            collections={collections}
            onSelect={onSelectCollection}
          />
        </ContextColumn>
      </Row>
      <Row>
        <div style={{ zIndex: 2, width: "100%" }}>
          <ContextColumn marginTop={40}>
            <AddTodoNav
              busy={addingTodoActivity}
              collections={collections}
              onTodoAdd={onTodoAdd}
              onTaskAdd={onTaskAdd}
              onTaskDelete={onTaskDelete}
              onTaskListClear={onTaskListClear}
              onTaskTitleEdit={onTaskTitleEdit}
              tasks={tasks}
              task={task}
              user={user}
            />
          </ContextColumn>
        </div>
      </Row>
      <Row
        style={{
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 16,
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          backgroundColor: "#fafaff",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 60,
            marginTop: 16,
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<Text ellipsis={{ symbol: "..." }}>{user.username}</Text>}
            description={<Text ellipsis={{ symbol: "..." }}>{user._id}</Text>}
            style={{ width: "100%" }}
          />
          <div
            style={{
              paddingRight: 5,
              display: "flex",
            }}
          >
            <Button type="link" onClick={() => {}}>
              <SettingOutlined key="settings" style={{ fontSize: 20 }} />
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                onLogout?.("");
              }}
            >
              <LogoutOutlined key="logout" style={{ fontSize: 20 }} />
            </Button>
          </div>
        </div>
      </Row>
    </>
  );
};

const ContextColumn = ({ marginTop, children }) => {
  return (
    <Col
      span={24}
      style={{
        marginTop: marginTop || 100,
        width: "100%",
        justifySelf: "center",
      }}
    >
      {children}
    </Col>
  );
};

export default LeftScreen;
