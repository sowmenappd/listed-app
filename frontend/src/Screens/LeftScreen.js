import React from "react";
import { Col, Row } from "antd";

import SearchBar from "../Components/SearchBar";
import AddCollectionNav from "../Components/AddCollectionNav";
import TodoCollectionNav from "../Components/TodoCollectionNav";
import AddTodoNav from "../Components/AddTodoNav";

import _collections from "../TestData/collections";

const LeftScreen = ({
  todos,
  tasks,
  task,
  onTodoAdd,
  onTaskAdd,
  onTaskDelete,
  onTaskTitleEdit,
  onTaskListClear,
  addingTodoActivity,
}) => {
  return (
    <>
      <Row>
        <ContextColumn marginTop={100}>
          <AddCollectionNav />
        </ContextColumn>
      </Row>
      <Row>
        <ContextColumn marginTop={1}>
          <TodoCollectionNav collections={_collections} />
        </ContextColumn>
      </Row>
      <Row>
        <ContextColumn marginTop={40}>
          <AddTodoNav
            busy={addingTodoActivity}
            onTodoAdd={onTodoAdd}
            onTaskAdd={onTaskAdd}
            onTaskDelete={onTaskDelete}
            onTaskListClear={onTaskListClear}
            onTaskTitleEdit={onTaskTitleEdit}
            tasks={tasks}
            task={task}
          />
        </ContextColumn>
      </Row>

      <Row
        style={{
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          alignItems: "center",
          bottom: 20,
        }}
      >
        <ContextColumn>
          <SearchBar />
        </ContextColumn>
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
