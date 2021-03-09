import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";

const MainScreen = () => {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleTodoAdd = (todoObj) => {
    if (!todoObj.tasks) {
      console.log("returning");
      return;
    }

    if (todoObj.title) {
      todoObj.title = todoObj.title.trim();
    }
    const newTodos = [todoObj, ...todos];
    setTodos(newTodos);
    setTasks([]);
  };

  const handleTaskAdd = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const handleTaskDelete = (id) => {
    const filtered = tasks.filter((_, index) => index !== id);
    setTasks(filtered);
  };

  const handleTaskListClear = () => {
    setTasks([]);
  };

  return (
    <>
      <Row
        style={{
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Col style={{ backgroundColor: "#191716" }} span={6}>
          <LeftScreen
            onTodoAdd={handleTodoAdd}
            onTaskAdd={handleTaskAdd}
            onTaskDelete={handleTaskDelete}
            onTaskListClear={handleTaskListClear}
            todos={todos}
            tasks={tasks}
          />
        </Col>
        <Col style={{ backgroundColor: "#fafaff" }} span={18}>
          <RightScreen todos={todos} />
        </Col>
      </Row>
    </>
  );
};

export default MainScreen;
