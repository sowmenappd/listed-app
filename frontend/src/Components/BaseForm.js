import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const BaseForm = ({ buttons, formName, fields, onSubmit, style }) => {
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <Form
      form={form}
      name={formName}
      size="large"
      style={{ width: 400, ...style }}
      onFinish={(values) => {
        setFormSubmitted(true);
        onSubmit?.(values);
      }}
    >
      {fields &&
        fields.map(({ name, type, placeholder, rules, extraProps }, i) => (
          <Form.Item name={name} rules={rules} key={i}>
            {type === "password" ? (
              <Input.Password
                {...extraProps}
                type={type}
                placeholder={placeholder}
                size="large"
                size={extraProps ? extraProps.size || "large" : "large"}
              />
            ) : (
              <Input
                {...extraProps}
                type={type}
                placeholder={placeholder}
                size="large"
                size={extraProps ? extraProps.size || "large" : "large"}
              />
            )}
          </Form.Item>
        ))}

      {buttons &&
        buttons.map(
          (
            {
              block,
              color,
              height = 60,
              htmlType = "submit",
              shape,
              style,
              text,
              textStyle,
              type,
              onClick,
            },
            i
          ) => (
            <Form.Item key={i}>
              <div
                style={{
                  ...style,
                }}
              >
                <Button
                  type={type || "primary"}
                  block={block || true}
                  loading={htmlType === "submit" ? formSubmitted : false}
                  shape={shape || "round"}
                  style={{
                    backgroundColor: color,
                    borderColor: color,
                    height,
                  }}
                  htmlType={htmlType}
                  onClick={onClick}
                >
                  <span style={{ ...textStyle }}>{text}</span>
                </Button>
              </div>
            </Form.Item>
          )
        )}
    </Form>
  );
};

export default BaseForm;

// Submit 🚀
// Forgot password 😢

// {
//     backgroundColor: "darkmagenta",
//     borderColor: "darkmagenta",
//     fontWeight: "bold",
//     fontSize: 24,
//     height: 60,
// }
