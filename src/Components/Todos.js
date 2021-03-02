import React, { useState } from "react";
import { Col, Divider, Row, Typography } from "antd";

import Todo from "./Todo";

const { Title } = Typography;

const Todos = () => {
  const [todos, setTodos] = useState([
    {
      title: "Test task",
      tasks: ["Buy milk", "Make tea"],
    },
    {
      title: "Test task 2",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task",
      tasks: ["Buy milk", "Make tea"],
    },
    {
      title: "Test task 2",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task",
      tasks: ["Buy milk", "Make tea"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task",
      tasks: ["Buy milk", "Make tea"],
    },
    {
      title: "Test task 2",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task 3",
      tasks: ["Buy paper", "Write letter to Mom"],
    },
    {
      title: "Test task",
      tasks: ["Buy milk", "Make tea"],
    },
  ]);

  return (
    <div>
      <Row>
        <Col span={24}>
          <div style={{ marginBottom: 30, marginLeft: 30 }}>
            <Divider>
              <Title
                style={{
                  fontWeight: "lighter",
                  lineHeight: 0,
                  marginBottom: 10,
                }}
              >
                Your todos
              </Title>
            </Divider>
          </div>
        </Col>
      </Row>
      <div
        style={{
          marginLeft: 30,
          height: "700px",
          overflowY: "auto",
        }}
      >
        {todos.length && (
          <Row>
            {todos.map((todo) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                <div style={{ margin: 2 }}>
                  <Todo todo={todo} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Todos;
