import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, notification, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import LeftScreen from "./LeftScreen";
import RightScreen from "./RightScreen";

import EditTodoModal from "../Components/EditTodoModal";
import ChangeCollectionModal from "../Components/ChangeCollectionModal";

import config from "../config";
const { apiBaseUrl } = config;

const MainScreen = ({ user, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [collections, setCollections] = useState([{ name: "All", _id: "" }]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [changeCollectionTodo, setChangeCollectionTodo] = useState(null);

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

  const handleTodoTaskAdd = (task) => {
    if (!focusedTodo) {
      //throw error
      return;
    }

    const todoIndex = todos.findIndex((t) => t === focusedTodo);

    const newTasks = [...focusedTodo.tasks, task];
    const newTodo = { ...focusedTodo, tasks: newTasks };

    let newTodos = [
      ...todos.slice(0, todoIndex),
      newTodo,
      ...todos.slice(todoIndex + 1),
    ];
    setTodos(newTodos);
    setCurrentTodo(newTodo);
  };

  const [addingActivity, setAddingActiviyState] = useState(false);
  const [loadingTodos, setLoadingTodos] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      setTodos([]);
      setLoadingTodos(true);

      const userId = user._id;
      if (!userId) return;

      let _todos;
      if (selectedCollection) {
        _todos = await axios.get(
          `${apiBaseUrl}/todos?collectionId=${selectedCollection}`
        );
      } else {
        _todos = await axios.get(`${apiBaseUrl}/todos?userId=${userId}`);
      }

      setTodos(_todos.data);
      setLoadingTodos(false);
    };
    if (!changeCollectionTodo) getTodos();
  }, [selectedCollection, changeCollectionTodo, user._id]);

  useEffect(() => {
    const getCollections = async () => {
      if (!user._id) return;
      const userId = user._id;
      const _collections = await axios.get(
        `${apiBaseUrl}/collections?userId=${userId}`
      );
      setCollections([{ name: "All", _id: "" }, ..._collections.data]);
    };
    getCollections();
  }, [user._id]);

  const handleCollectionAdd = async (collectionObj) => {
    const res = await axios.post(`${apiBaseUrl}/collections`, collectionObj);

    if (res.status === 200) {
      let newCollection = res.data;
      const newCollections = [...collections, newCollection];
      setCollections(newCollections);
    }
  };

  const handleCollectionDelete = async (collectionObj) => {
    const res = await axios.delete(`${apiBaseUrl}/collections`, {
      data: collectionObj,
    });

    if (res.status === 200) {
      notification.info({
        message: "Collection deleted.",
        description:
          'Todos in this collection have been shifted to "All" collection.',
      });

      const fCollections = collections.filter(
        (c) => c._id !== collectionObj._id
      );
      setCollections(fCollections);
      setSelectedCollection("");
    } else {
      notification.error({
        message: "Deletion unsuccessful.",
        description: "Something went wrong.",
      });
    }
  };

  const handleCollectionSelect = (collectionKey) => {
    console.log(collectionKey);
    setSelectedCollection(collectionKey);
  };

  const handleSearch = async (term) => {
    console.log("Search:", term);
    if (!term || term.length < 3) {
      return;
    }
    const userId = user._id;
    const result = await axios.post(
      `${apiBaseUrl}/todos/search?q=${term}&userId=${userId}`
    );
    result.data?.map(({ name }) => console.log(name));
  };

  const handleTodoAdd = async (todoObj) => {
    if (!todoObj.tasks) {
      console.log("returning");
      return;
    }

    setAddingActiviyState(true);

    todoObj.name = todoObj.name ? todoObj.name.trim() : "Untitled Todo";

    const res = await axios.post(`${apiBaseUrl}/todos`, todoObj);
    setAddingActiviyState(false);

    let newTodos;

    if (res.status === 200) {
      let newTodo = res.data;
      newTodos = [newTodo, ...todos];
      setTodos(newTodos);
      setTasks([]);

      notification.success({
        message: "Todo added successfully!",
        description: `${newTodo.name}`,
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

    const res = await axios.delete(`${apiBaseUrl}/todos/${_id}`);
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

  //this function call
  const handleTodoCollectionChangeModalOpen = (todo) => {
    console.log(todo);
    setChangeCollectionTodo(todo);
  };

  const handleTodoUpdate = async (todo) => {
    const todoIndex = todos.findIndex((t) => t._id === todo._id);
    const oldTodo = todos[todoIndex];

    const newTodos = [
      ...todos.slice(0, todoIndex),
      todo,
      ...todos.slice(todoIndex + 1),
    ];

    console.log(`In handler function: ${todo.name}`);
    try {
      const res = await axios.put(`${apiBaseUrl}/todos/`, todo);
      if (res.status === 200) {
        notification.success({
          message: "Todo updated successfully!",
        });
        setTodos(newTodos);
      }
    } catch (ex) {
      newTodos[todoIndex] = oldTodo;
      setTodos(newTodos);
      notification.error({
        message: "Todo update failed.",
        description: "Something went wrong.",
      });
      return false;
    }
  };

  const handleTaskAdd = (task) => {
    const newTasks = [...tasks, { name: task, completed: false }];
    setTasks(newTasks);
  };

  const handleTodoTaskToggle = async (todo, task) => {
    const todoIndex = todos.findIndex((t) => t === todo);
    const taskIndex = todo.tasks.findIndex((t) => t === task);

    //copy all unchanged tasks
    const oldTasks = todo.tasks.filter((t) => true);
    //toggle the target task
    const toggleTask = { ...task, completed: !task.completed };
    //set the new task
    const modifiedTodo = {
      ...todo,
      tasks: [...oldTasks],
    };
    modifiedTodo.tasks[taskIndex] = toggleTask;

    let newTodos = [
      ...todos.slice(0, todoIndex),
      modifiedTodo,
      ...todos.slice(todoIndex + 1),
    ];
    setTodos(newTodos);

    const res = await axios.put(`${apiBaseUrl}/todos`, modifiedTodo);
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

  const handleTagUpdate = async (todo, tags) => {
    const index = todos.findIndex((t) => t._id === todo._id);
    const oldTodo = todos[index];
    const oldTags = oldTodo.tags;

    const newTodo = { ...oldTodo, tags };
    const newTodos = [...todos];

    try {
      const res = await axios.put(`${apiBaseUrl}/todos/`, newTodo);
      if (res.status === 200) {
        newTodos[index] = res.data;
        setTodos(newTodos);
      }
    } catch (ex) {
      notification.error({
        message: "Could not update tags.",
        description: "An error occured. Please try again.",
      });
    }
  };

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col style={{ backgroundColor: "#191716" }} span={7}>
          <LeftScreen
            addingTodoActivity={addingActivity}
            collections={collections}
            onAddCollection={handleCollectionAdd}
            onLogout={(v) => {
              Modal.confirm({
                title: "Are you sure you want to log out?",
                icon: <ExclamationCircleOutlined />,
                onOk: () => {
                  onLogout?.(v);
                },
              });
            }}
            onSelectCollection={handleCollectionSelect}
            onSearch={handleSearch}
            onTodoAdd={handleTodoAdd}
            onTaskAdd={handleTaskAdd}
            onTaskDelete={handleTaskDelete}
            onTaskListClear={handleTaskListClear}
            todos={todos}
            tasks={tasks}
            user={user}
          />
        </Col>
        <Col style={{ backgroundColor: "#fafaff" }} span={17}>
          <RightScreen
            collections={collections}
            loadingTodos={loadingTodos}
            onCollectionAdd={handleCollectionAdd}
            onCollectionDelete={handleCollectionDelete}
            onDeleteTodo={handleTodoDelete}
            onEditTodo={(todo) => setCurrentTodo(todo)}
            onSelectCollection={handleCollectionSelect}
            onTodoChangeCollection={handleTodoCollectionChangeModalOpen}
            onTodoTaskToggle={handleTodoTaskToggle}
            onUpdateTag={handleTagUpdate}
            onUpdateTodo={handleTodoUpdate}
            selectedCollection={selectedCollection}
            todos={todos}
            user={user}
          />
        </Col>
        <EditTodoModal
          collections={collections}
          todoData={focusedTodo}
          onAddTask={handleTodoTaskAdd}
          onChangeTaskName={handleTodoTaskNameChange}
          onUpdated={(b) => {
            if (!b) {
              const handler = async () => {
                try {
                  const userId = user._id;
                  const _todos = await axios.get(
                    `${apiBaseUrl}/todos?userId=${userId}`
                  );
                  setTodos(_todos.data);
                  setCurrentTodo(null);
                } catch (ex) {
                  console.log(ex.message);
                }
                if (b === false) {
                  notification.error({
                    message: "Todo update failed.",
                    description: "Please try again.",
                  });
                }
              };
              handler();
            } else if (b === true) {
              setCurrentTodo(null);
              notification.success({
                message: "Todo updated successfully.",
              });
            }
          }}
          submitAsyncHandler={async () => {
            return await axios.put(`${apiBaseUrl}/todos`, focusedTodo);
          }}
        />
        <ChangeCollectionModal
          collections={collections}
          todoData={changeCollectionTodo}
          onChangeConfirm={async (td) => {
            try {
              const success = await handleTodoUpdate(td);
              if (success) {
                setChangeCollectionTodo(null);
              }
            } catch (ex) {
              notification.error({
                message: "Couldn't update todo.",
                description: "Something went wrong. Please try again.",
              });
            }
          }}
          onCancel={() => {
            setChangeCollectionTodo(null);
          }}
        />
      </Row>
    </div>
  );
};

export default MainScreen;
