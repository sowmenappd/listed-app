import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const { Text } = Typography;

const BaseForm = ({
  buttons,
  formName,
  fields,
  onSubmit,
  onResponse,
  style,
}) => {
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <Form
      form={form}
      name={formName}
      size="large"
      style={style}
      onFinish={async (values) => {
        setFormSubmitted(true);
        const value = await onSubmit?.(values);
        onResponse?.(value);
        setFormSubmitted(false);
      }}
    >
      <div>
        {fields &&
          fields.map(
            ({ label, name, type, placeholder, rules, extraProps }, i) =>
              type === "checkbox" ? (
                <Form.Item name={name} valuePropName="checked" key={i}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Checkbox style={{ ...extraProps }}>{label}</Checkbox>
                  </div>
                </Form.Item>
              ) : (
                <Form.Item name={name} rules={rules} key={i}>
                  {type === "password" ? (
                    <Input.Password
                      {...extraProps}
                      type={type}
                      placeholder={placeholder}
                    />
                  ) : (
                    <Input
                      {...extraProps}
                      type={type}
                      placeholder={placeholder}
                    />
                  )}
                </Form.Item>
              )
          )}
      </div>

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
                  <Text
                    style={{ ...textStyle, width: "100%" }}
                    ellipsis={{ symbol: ".." }}
                  >
                    {text}
                  </Text>
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
