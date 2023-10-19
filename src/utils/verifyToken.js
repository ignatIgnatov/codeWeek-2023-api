import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import Blog from "../models/Blog.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));

    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authenticated!"));
    }
  });
};

export const verifyBlogOwner = (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (req.user.id === blog.author.toString()) {
        next();
      } else {
        return next(createError(403, "You are not authenticated!"));
      }
    })
    .catch((err) => {
      next(createError(404, "Blog not found!"));
    });
};
