import React, { useState } from "react";
import BaseForm from "./BaseForm";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import rules from "../Config/FormRules";

const SignupForm = ({ onBack, onSubmit }) => {
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
      name: "cpass",
      type: "password",
      placeholder: "Confirm password",
      rules: rules.password,
      extraProps: {
        iconRender: (visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
      },
    },
  ];
  const buttons = [
    {
      color: "darkmagenta",
      htmlType: "submit",
      shape: "round",
      style: {
        marginTop: 50,
      },
      textStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
      text: "Create my account! 😄",
    },
    {
      color: "limegreen",
      htmlType: "button",
      onClick: () => {
        onBack?.("login");
      },
      shape: "round",
      style: {
        marginTop: 0,
      },
      textStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
      text: "◀️ Login page",
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

export default SignupForm;
