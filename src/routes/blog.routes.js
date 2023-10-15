import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", updateBlogById);
router.delete("/blogs/:id", deleteBlogById);

export default router;
