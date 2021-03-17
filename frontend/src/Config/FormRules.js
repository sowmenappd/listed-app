const rules = {
  email: [
    {
      required: true,
      message: "Please enter your username!",
      type: "email",
    },
  ],
  password: [
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
};

export default rules;
