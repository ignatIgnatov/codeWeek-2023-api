import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from "../controllers/blog.controller.js";
import { verifyToken, verifyBlogOwner } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", verifyToken, verifyBlogOwner, updateBlogById);
router.delete("/:id", verifyToken, verifyBlogOwner, deleteBlogById);

export default router;
