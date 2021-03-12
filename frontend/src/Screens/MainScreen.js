import React, { useEffect, useState } from "react";
import { Row, Col, notification } from "antd";
import axios from "axios";

import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";

import EditTodoModal from "../Components/EditTodoModal";

const MainScreen = () => {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [focusedTodo, setCurrentTodo] = useState(null);
  const handleTodoTaskNameChange = (todo, index, taskName) => {
    const todoIndex = todos.findIndex((t) => t === todo);

    //copy all unchanged tasks
    const oldTasks = todo.tasks.filter((_, i) => i !== index);
    //toggle the target task
    const toggleTask = { ...todo.tasks[index], name: taskName };
    //set the new task
    const modifiedTodo = {
      ...todo,
      tasks: [
        ...oldTasks.slice(0, index),
        toggleTask,
        ...oldTasks.slice(index),
      ],
    };

    let newTodos = [
      ...todos.slice(0, todoIndex),
      modifiedTodo,
      ...todos.slice(todoIndex + 1),
    ];
    setTodos(newTodos);
    setCurrentTodo(modifiedTodo);
  };

  const [addingActivity, setAddingActiviyState] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = "60491df3f8e08af8c3126e09";
      const _todos = await axios.get(`/api/todos?userId=${userId}`);
      setTodos(_todos.data);
    })();
  }, []);

  const handleTodoAdd = async (todoObj) => {
    if (!todoObj.tasks) {
      console.log("returning");
      return;
    }

    setAddingActiviyState(true);

    if (todoObj.name) {
      todoObj.name = todoObj.name.trim();
    } else {
      todoObj.name = "Untitled Todo";
    }
    const newTodos = [todoObj, ...todos];
    setTodos(newTodos);
    setTasks([]);

    const res = await axios.post("/api/todos", todoObj);
    setAddingActiviyState(false);

    if (res.status === 200) {
      notification.success({
        message: "Todo added successfully!",
        description: `${todoObj.name}`,
      });
    } else {
      notification.error({
        message: "Error adding todo.",
        description: `Please try again.`,
      });
    }
  };

  const handleTodoDelete = async (todo) => {
    const oldTodos = todos;
    const newTodos = todos.filter((t) => t !== todo);
    setTodos(newTodos);

    let _id = todo._id;
    console.log(_id);

    const res = await axios.delete(`/api/todos/${_id}`);
    if (res.status !== 200) {
      setTodos(oldTodos);
      notification.error({
        message: "Couldn't delete todo.",
        description: `Something went wrong.`,
      });
    } else {
      notification.success({
        message: "Todo deleted.",
      });
    }
  };

  const handleTodoUpdate = async (todo) => {};

  const handleTaskAdd = (task) => {
    const newTasks = [...tasks, { name: task, completed: false }];
    setTasks(newTasks);
  };

  const handleTodoTaskToggle = async (todo, task) => {
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

    let newTodos = [
      ...todos.slice(0, todoIndex),
      modifiedTodo,
      ...todos.slice(todoIndex + 1),
    ];
    setTodos(newTodos);

    const res = await axios.put("/api/todos", modifiedTodo);
    if (res.status !== 200) {
      newTodos = [
        ...todos.slice(0, todoIndex),
        todo,
        ...todos.slice(todoIndex + 1),
      ];

      setTodos(newTodos);
    }
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
            addingTodoActivity={addingActivity}
            onTodoAdd={handleTodoAdd}
            onTaskAdd={handleTaskAdd}
            onTaskDelete={handleTaskDelete}
            onTaskListClear={handleTaskListClear}
            todos={todos}
            tasks={tasks}
          />
        </Col>
        <Col style={{ backgroundColor: "#fafaff" }} span={18}>
          <RightScreen
            todos={todos}
            onDeleteTodo={handleTodoDelete}
            onEditTodo={(todo) => setCurrentTodo(todo)}
            onTodoTaskToggle={handleTodoTaskToggle}
          />
        </Col>
        <EditTodoModal
          todoData={focusedTodo}
          onChangeTaskName={handleTodoTaskNameChange}
          onUpdated={(b) => {
            if (!b) {
              const handler = async () => {
                setCurrentTodo(null);
                const userId = "60491df3f8e08af8c3126e09";
                const _todos = await axios.get(`/api/todos?userId=${userId}`);
                setTodos(_todos.data);
              };
              handler();
            } else {
              setCurrentTodo(null);
              notification.success({
                message: "Todo updated successfully.",
              });
            }
          }}
          submitAsyncHandler={async () => {
            return await axios.put("/api/todos", focusedTodo);
          }}
        />
      </Row>
    </div>
  );
};

export default MainScreen;
