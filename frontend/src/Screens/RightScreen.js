import React from "react";

import Logo from "../Components/Logo";
import Todos from "../Components/Todos";

const RightScreen = ({
  collections,
  loadingTodos,
  onUpdateTag,
  onCollectionAdd,
  onCollectionDelete,
  onDeleteTodo,
  onEditTodo,
  onSelectCollection,
  onTodoChangeCollection,
  onTodoTaskToggle,
  onUpdateTodo,
  selectedCollection,
  todos,
}) => {
  return (
    <>
      <Logo />
      <div
        style={{
          paddingTop: 150,
          alignSelf: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Todos
          collections={collections}
          loading={loadingTodos}
          onCollectionAdd={onCollectionAdd}
          onCollectionDelete={onCollectionDelete}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          onSelectCollection={onSelectCollection}
          onTodoChangeCollection={onTodoChangeCollection}
          onTodoTaskToggle={onTodoTaskToggle}
          onUpdateTag={onUpdateTag}
          onUpdateTodo={onUpdateTodo}
          selectedCollection={selectedCollection}
          todos={todos}
        />
      </div>
    </>
  );
};

export default RightScreen;
