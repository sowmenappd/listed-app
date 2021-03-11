import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";

import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";
import DatabaseManager from "../Components/DatabaseManager";

const MainScreen = () => {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const userId = "60491df3f8e08af8c3126e09";
      const _todos = await axios.get(`/api/todos?userId=${userId}`);
      console.log(_todos.data);
      setTodos(_todos.data);
    })();
  }, []);

  const handleTodoAdd = (todoObj) => {
    if (!todoObj.tasks) {
      console.log("returning");
      return;
    }

    if (todoObj.name) {
      todoObj.name = todoObj.name.trim();
    }
    const newTodos = [todoObj, ...todos];
    setTodos(newTodos);
    setTasks([]);
  };

  const handleTaskAdd = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const handleTodoTaskToggle = (todo, task) => {
    // const oldTodos = todos.filter((t) => t !== todo);

    const todoIndex = todos.findIndex((t) => t === todo);
    const taskIndex = todo.tasks.findIndex((t) => t === task);

    //copy all unchanged tasks
    const oldTasks = todo.tasks.filter((t) => t !== task);
    //toggle the target task
    const toggleTask = { ...task, completed: !task.completed };
    //set the new task
    const modifiedTodo = {
      ...todo,
      tasks: [
        ...oldTasks.slice(0, taskIndex),
        toggleTask,
        ...oldTasks.slice(taskIndex),
      ],
    };

    const newTodos = [
      ...todos.slice(0, todoIndex),
      modifiedTodo,
      ...todos.slice(todoIndex + 1),
    ];
    setTodos(newTodos);
  };

  const handleTaskDelete = (id) => {
    const filtered = tasks.filter((_, index) => index !== id);
    setTasks(filtered);
  };

  const handleTaskListClear = () => {
    setTasks([]);
  };

  return (
    <div>
      <Row style={{ height: "100vh" }}>
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
          <RightScreen todos={todos} onTodoTaskToggle={handleTodoTaskToggle} />
        </Col>
      </Row>
    </div>
  );
};

export default MainScreen;
