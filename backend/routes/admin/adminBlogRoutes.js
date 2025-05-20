// // routes/admin/blogAdminRoutes.js
// import express from "express";
// import {
//   createBlog,
//   getAllBlogs,
//   getBlogBySlug,
//   updateBlog,
//   deleteBlog,
//   togglePublishBlog,
// } from "../../controllers/admin/blogController.js";
// import { adminOnly } from "../../middlewares/authMiddleware.js";
// import  adminAuth from "../../middleware/adminAuth.js";

// const router = express.Router();

// router.post("/", adminAuth, createBlog); // Create
// router.get("/", adminAuth, getAllBlogs); // Read all
// router.get("/:slug", adminAuth, getBlogBySlug); // Read one
// router.put("/:id", adminAuth, updateBlog); // Update
// router.delete("/:id", adminAuth, deleteBlog); // Delete
// router.patch("/toggle-publish/:id", adminAuth, togglePublishBlog); // Toggle publish

// export default router;


import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  togglePublishBlog,
} from "../../controllers/admin/blogController.js";
import { protectAdmin } from "../../middlewares/newAuth.js"; // Updated admin middleware
import adminAuth from "../../middleware/adminAuth.js"; // You might still want to keep this for further customizations

const router = express.Router();

// 🧑‍💼 Admin-only routes, protected by protectAdmin middleware
router.post("/", protectAdmin, createBlog); // Create Blog
router.get("/", protectAdmin, getAllBlogs); // Get all Blogs
router.get("/:slug", protectAdmin, getBlogBySlug); // Get one Blog
router.put("/:id", protectAdmin, updateBlog); // Update Blog
router.delete("/:id", protectAdmin, deleteBlog); // Delete Blog
router.patch("/toggle-publish/:id", protectAdmin, togglePublishBlog); // Toggle publish

export default router;
