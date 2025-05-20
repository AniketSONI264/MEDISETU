// // routes/blogRoutes.js
// import express from "express";
// import {
//   getAllPublishedBlogs,
//   getPublishedBlogBySlug,
//   likeBlog,
// } from "../controllers/admin/blogController.js";

// import { protect } from "../middleware/authMiddleware.js"; // user login protection

// const router = express.Router();

// router.get("/", getAllPublishedBlogs); // only published blogs
// router.get("/:slug", getPublishedBlogBySlug); // single blog (published)
// router.patch("/like/:id", protect, likeBlog); // like toggle (only if logged in)

// export default router;


import express from "express";
import {
  getAllPublishedBlogs,
  getPublishedBlogBySlug,
  likeBlog,
} from "../controllers/admin/blogController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPublishedBlogs);
router.get("/:slug", getPublishedBlogBySlug);
router.patch("/like/:id", protectUser, likeBlog);

export default router;
