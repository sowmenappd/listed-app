import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jwt-simple";

const { HmacSHA256 } = CryptoJS;

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const secret = process.env.CRYPTO_SECRET_KEY;

    const result = await User.findOne({ username });
    if (result) {
      const test_hash = HmacSHA256(password, secret).toString();

      if (result.password_hash === test_hash) {
        const token = jwt.encode(
          {
            username: result.username,
            _id: result._id,
            createdAt: result.createdAt,
          },
          secret
        );
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Invalid login." });
      }
    } else {
      return res.status(401).json({ message: "Invalid login." });
    }
  } catch ({ message }) {
    console.log(message);
    return res.status(500).json({ message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length must be at least 6." });
    }

    let result = await User.findOne({ username });
    if (result) {
      return res
        .status(400)
        .json({ message: "User with that email already exists." });
    }

    const password_hash = HmacSHA256(
      password,
      process.env.CRYPTO_SECRET_KEY
    ).toString();

    let user = new User({ username, password_hash });
    result = await user.save();

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ message: "Server encountered an error." });
    }
  } catch ({ message }) {
    console.log(message);
    return res.status(500).json({ message });
  }
};
