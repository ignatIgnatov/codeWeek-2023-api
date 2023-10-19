import User from "../models/User.model.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return next(createError(400, "Username already exist!"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("User has been registered!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password!"));

    const token = jwt.sign({ id: user.id }, process.env.JWT);

    const { password, ...info } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ details: info, message: "Login successful!" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send("Logout successful!");
  } catch (error) {
    next(error);
  }
};
