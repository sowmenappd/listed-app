import React from "react";
import BaseForm from "./BaseForm";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import rules from "../Config/FormRules";

const LoginForm = ({ onBack, onSubmit, onResponse, onRemember }) => {
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
    {
      name: "rememberMe",
      type: "checkbox",
      label: "Remember Me",
      extraProps: {
        color: "#fafaff",
        fontSize: 20,
        marginTop: -20,
      },
      onChange: ({ target: { checked } }) => {
        console.log(checked);
        onRemember?.(checked);
      },
    },
  ];
  const buttons = [
    {
      color: "blueviolet",
      htmlType: "submit",
      onClick: () => {},
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
      onClick: () => {},
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
      onResponse={onResponse}
    />
  );
};

export default LoginForm;
