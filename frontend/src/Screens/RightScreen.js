import React from "react";

import Logo from "../Components/Logo";
import Todos from "../Components/Todos";

const RightScreen = ({ onDeleteTodo, onEditTodo, onTodoTaskToggle, todos }) => {
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
          todos={todos}
          onTodoTaskToggle={onTodoTaskToggle}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      </div>
    </>
  );
};

export default RightScreen;
