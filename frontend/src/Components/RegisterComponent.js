import React from "react";
import SignupForm from "./SignupForm";

const RegisterComponent = ({ onBackPressed, onSubmit, onResponse }) => {
  return (
    <>
      <div
        style={{
          fontSize: 50,
          marginTop: 30,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <span style={{ color: "darkmagenta" }}>Sign</span>
        <span style={{ color: "blueviolet" }}>up</span>
      </div>
      <div>
        <SignupForm
          onSubmit={onSubmit}
          onResponse={onResponse}
          onBack={onBackPressed}
        />
      </div>
    </>
  );
};

export default RegisterComponent;
