import React, { useState } from "react";
import { Col, Divider, List, Row, Typography } from "antd";

import Todo from "./Todo";
import todos from "../TestData/todos";

const { Title } = Typography;

const Todos = () => {
  const [todos_, setTodos] = useState(todos);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Row>
        <Col span={24}>
          <div
            style={{
              marginBottom: 30,
              marginLeft: 40,
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
        {todos.length && (
          <List
            style={{
              overflowX: "hidden",
              overflowY: "clip",
              width: "100%",
              height: "70vh",
              flex: 1,
              marginLeft: 40,
            }}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            dataSource={todos_}
            renderItem={(todo) => (
              <List.Item>
                <Todo todo={todo} />
              </List.Item>
            )}
          />
        )}
      </Row>
    </div>
  );
};

export default Todos;
