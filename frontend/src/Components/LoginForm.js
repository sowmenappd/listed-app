import React, { useState } from "react";
import BaseForm from "./BaseForm";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const formFields = [
  {
    name: "username",
    type: "email",
    placeholder: "E-mail",
    rules: [
      {
        required: true,
        message: "Please enter your username!",
        type: "email",
      },
    ],
    extraProps: { size: "large" },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    rules: [
      {
        required: true,
        message: "Please enter your password!",
      },
      {
        pattern: new RegExp("^[^ <>,%$]*$"),
        message:
          "Password cannot contain any whitespace or characters '<', '>', ',', '%', '$' !",
      },
      {
        message: "Password length must be at least 6.",
        min: 6,
      },
    ],
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
    shape: "round",
    textStyle: {
      fontWeight: "bold",
      fontSize: 24,
    },
    text: "Forgot password 😢",
  },
];

const LoginForm = ({ onSubmit }) => {
  // const [form] = Form.useForm();
  // const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <BaseForm
      fields={formFields}
      buttons={buttons}
      formName="login"
      onSubmit={onSubmit}
    />
  );
};

// const OldForm = ({...props}) => (
//   <Form
//       form={form}
//       name="login"
//       size="large"
//       style={{ width: 400 }}
//       onFinish={(values) => {
//         setFormSubmitted(true);
//         onSubmit?.(values);
//       }}
//     >
//       <Form.Item
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: "Please enter your username!",
//             type: "email",
//           },
//         ]}
//       >
//         <Input type="email" placeholder="E-mail" size="large" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: "Please enter your password!",
//           },
//           {
//             pattern: new RegExp("^[^ <>,%$]*$"),
//             message:
//               "Password cannot contain any whitespace or characters '<', '>', ',', '%', '$' !",
//           },
//           {
//             message: "Password length must be at least 6.",
//             min: 6,
//           },
//         ]}
//       >
//         <Input.Password
//           type="password"
//           placeholder="Password"
//           iconRender={(visible) =>
//             visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//           }
//           size="large"
//         />
//       </Form.Item>

//       <Form.Item>
//         <div
//           style={{
//             marginTop: 15,
//           }}
//         >
//           <Button
//             type="primary"
//             block
//             loading={formSubmitted}
//             shape="round"
//             style={{
//               backgroundColor: "blueviolet",
//               borderColor: "blueviolet",
//               fontWeight: "bold",
//               fontSize: 24,
//               height: 60,
//             }}
//             htmlType="submit"
//           >
//             Submit 🚀
//           </Button>
//         </div>
//       </Form.Item>
//       <Form.Item>
//         <Button
//           type="primary"
//           block
//           shape="round"
//           style={{
//             backgroundColor: "darkmagenta",
//             borderColor: "darkmagenta",
//             fontWeight: "bold",
//             fontSize: 24,
//             height: 60,
//           }}
//           htmlType="button"
//         >
//           <span>Forgot password 😢</span>
//         </Button>
//       </Form.Item>
//     </Form>
// );

export default LoginForm;
