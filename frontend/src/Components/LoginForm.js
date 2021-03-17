import React from "react";
import BaseForm from "./BaseForm";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import rules from "../Config/FormRules";

const LoginForm = ({ onBack, onSubmit }) => {
  const formFields = [
    {
      name: "username",
      type: "email",
      placeholder: "E-mail",
      rules: rules.email,
      extraProps: { size: "large" },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      rules: rules.password,
      extraProps: {
        iconRender: (visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
      },
    },
  ];
  const buttons = [
    {
      color: "blueviolet",
      htmlType: "submit",
      shape: "round",
      style: {
        marginTop: 50,
      },
      textStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
      text: "Submit 🚀",
    },
    {
      color: "darkmagenta",
      htmlType: "button",
      onClick: () => {
        console.log("forgot password");
      },
      shape: "round",
      textStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
      text: "Forgot password 😢",
    },
    {
      color: "blue",
      htmlType: "button",
      onClick: () => {
        onBack?.("signup");
      },
      shape: "round",
      textStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
      text: "Create new account",
    },
  ];
  return (
    <BaseForm
      fields={formFields}
      buttons={buttons}
      formName="login"
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
