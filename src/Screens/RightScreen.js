import React from "react";

import Logo from "../Components/Logo";
import Todos from "../Components/Todos";

const RightScreen = ({ todos }) => {
  return (
    <>
      <Logo />
      <div
        style={{
          paddingTop: 150,
          alignSelf: "center",
          paddingLeft: 20,
          paddingRight: 20,
          // overflowY: "hidden",
        }}
      >
        <Todos todos={todos} />
      </div>
    </>
  );
};

export default RightScreen;
