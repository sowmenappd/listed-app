import User from "../models/User.js";

//getUsers function to get all users
export const getUsers = async (req, res) => {
  let users = await User.find({});
  res.json(users);
};

//getUserById function to retrieve user by id
export const getUserById = async (req, res) => {
  console.log(req.params.id.toString());
  const user = await User.findById(req.params.id);

  console.log(user);

  //if user id match param id send user else throw error
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
