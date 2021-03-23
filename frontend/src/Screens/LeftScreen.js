import React from "react";
import { Avatar, Button, Card, Col, Row, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import SearchBar from "../Components/SearchBar";
import AddCollectionNav from "../Components/AddCollectionNav";
import TodoCollectionNav from "../Components/TodoCollectionNav";
import AddListNav from "../Components/AddTodoNav";

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
    <div style={{ position: "fixed", width: "30%" }}>
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
            <AddListNav
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
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 16,
          position: "fixed",
          width: "30%",
          bottom: 0,
          zIndex: 1,
          backgroundColor: "#fafaff",
        }}
      >
        <div
          style={{
            height: 60,
            marginTop: 16,
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Card.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                  marginTop: 10,
                }}
                icon={<UserOutlined />}
              />
            }
            title={<Text ellipsis={{ symbol: "..." }}>{user.username}</Text>}
            description={
              <Text ellipsis={{ symbol: "..." }} type="secondary">
                <i>
                  {user._id.substring(user._id.length - 6, user._id.length - 1)}
                </i>
              </Text>
            }
            style={{ width: "100%" }}
          />
          <div>
            <Button
              type="link"
              danger
              onClick={() => {
                onLogout?.("");
              }}
              style={{ width: "100%", height: "100%", textAlign: "right" }}
            >
              <LogoutOutlined key="logout" style={{ fontSize: 20 }} />
            </Button>
          </div>
        </div>
      </Row>
    </div>
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
