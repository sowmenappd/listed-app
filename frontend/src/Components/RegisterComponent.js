import React from "react";
import SignupForm from "./SignupForm";

const RegisterComponent = ({ onSubmit, onBackPressed }) => {
  return (
    <>
      <div style={{ fontSize: 50, marginTop: 30, marginBottom: 40 }}>
        <span style={{ color: "darkmagenta" }}>Sign</span>
        <span style={{ color: "blueviolet" }}>up</span>
      </div>
      <div>
        <SignupForm onSubmit={onSubmit} onBack={onBackPressed} />
      </div>
    </>
  );
};

export default RegisterComponent;
