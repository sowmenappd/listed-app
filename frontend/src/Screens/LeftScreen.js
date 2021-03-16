import React from "react";
import { Col, Row } from "antd";

import SearchBar from "../Components/SearchBar";
import AddCollectionNav from "../Components/AddCollectionNav";
import TodoCollectionNav from "../Components/TodoCollectionNav";
import AddTodoNav from "../Components/AddTodoNav";

// import _collections from "../TestData/collections";

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
          <AddCollectionNav onAdd={onAddCollection} />
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
          />
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
