import Blog from "../models/Blog.model.js";
import { createError } from "../utils/error.js";

export const createBlog = async (req, res, next) => {
  let newBlog = Blog(req.body);

  try {
    await newBlog.save();
    res.send("Blog saved");
  } catch (e) {
    next(e);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    let blogs = await Blog.find();

    res.json({ data: blogs });
  } catch (e) {
    next(e);
  }
};

export const getBlogById = async (req, res, next) => {
  let id = req.params.id;

  try {
    let blog = await Blog.findById(id);

    res.json({ data: blog });
  } catch (e) {
    next(e);
  }
};

export const updateBlogById = async (req, res, next) => {
  let id = req.params.id;
  try {
    let updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
  } catch (e) {
    next(e);
  }

  res.json({ data: updatedBlog });
};

export const deleteBlogById = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.json("Blog deleted");
  } catch (e) {
    next(e);
  }
};
