import User from "../models/User.model.js";

export const createUser = async (req, res, next) => {
  let newUser = new User(req.body);

  await newUser.save();
  res.send("User saved");
};
