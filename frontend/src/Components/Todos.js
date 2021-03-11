import React from "react";
import { Col, Divider, Empty, List, Row, Typography } from "antd";

import Todo from "./Todo";

const { Text, Title } = Typography;

const Todos = ({ todos, onTodoTaskToggle, onDeleteTodo, onEditTodo }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Row>
        <Col span={24}>
          <div
            style={{
              marginBottom: 30,
              width: "100%",
            }}
          >
            <Divider>
              <Title
                style={{
                  fontWeight: "lighter",
                  marginBottom: 10,
                }}
              >
                Your todos
              </Title>
            </Divider>
          </div>
        </Col>
      </Row>
      <Row>
        {todos.length ? (
          <List
            style={{
              overflowX: "hidden",
              overflowY: "auto",
              paddingBottom: 20,
              paddingLeft: 20,
              display: "grid",
              width: "100vw",
            }}
            grid={{
              gutter: 32,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={todos}
            renderItem={(td, i) => (
              <List.Item key={i}>
                <Todo
                  todo={td}
                  onTaskToggle={onTodoTaskToggle}
                  onDelete={null}
                  onEdit={null}
                />
              </List.Item>
            )}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Empty
              description={<Text style={{ fontSize: 36 }}>No todos found</Text>}
              imageStyle={{ marginTop: 50, width: 400, height: 250 }}
            />
          </div>
        )}
      </Row>
    </div>
  );
};

export default Todos;
