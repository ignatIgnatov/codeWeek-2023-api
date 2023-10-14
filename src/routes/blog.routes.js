import express from "express";
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  updateBlogById,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", updateBlogById);
router.delete("/blogs/:id", deleteBlogById);

export default router;
