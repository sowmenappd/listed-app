import React from "react";
import LoginForm from "./LoginForm";

const LoginComponent = ({
  onSubmit,
  onResponse,
  onBackPressed,
  onRemember,
}) => {
  return (
    <>
      <div style={{ fontSize: 50, marginTop: 30, marginBottom: 40 }}>
        <span style={{ color: "blueviolet" }}>Log</span>
        <span style={{ color: "darkmagenta" }}>in</span>
      </div>
      <div>
        <LoginForm
          onSubmit={onSubmit}
          onResponse={onResponse}
          onBack={onBackPressed}
          onRemember={onRemember}
        />
      </div>
    </>
  );
};

export default LoginComponent;
