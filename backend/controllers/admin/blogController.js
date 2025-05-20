
// import Blog from "../../models/blogModel.js";
// import slugify from "slugify";
// import asyncHandler from "express-async-handler";

// // @desc    Create a new blog
// export const createBlog = asyncHandler(async (req, res) => {
//   const { title } = req.body;
//   const slug = slugify(title, { lower: true, strict: true });

//   const blog = new Blog({ ...req.body, slug });
//   await blog.save();

//   res.status(201).json({ success: true, message: "Blog created!", blog });
// });

// // @desc    Get all blogs
// export const getAllBlogs = asyncHandler(async (req, res) => {
//   const blogs = await Blog.find().sort({ createdAt: -1 });
//   res.status(200).json({ success: true, blogs });
// });

// // @desc    Get blog by slug
// export const getBlogBySlug = asyncHandler(async (req, res) => {
//   const blog = await Blog.findOne({ slug: req.params.slug });
//   if (!blog) throw new Error("Blog not found");
//   res.status(200).json({ success: true, blog });
// });

// // @desc    Update a blog
// export const updateBlog = asyncHandler(async (req, res) => {
//   const { title } = req.body;
//   if (title) req.body.slug = slugify(title, { lower: true, strict: true });

//   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!updatedBlog) throw new Error("Blog not found");
//   res.status(200).json({ success: true, message: "Blog updated", updatedBlog });
// });

// // @desc    Delete a blog
// export const deleteBlog = asyncHandler(async (req, res) => {
//   const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//   if (!deletedBlog) throw new Error("Blog not found");
//   res.status(200).json({ success: true, message: "Blog deleted" });
// });

// // @desc    Toggle publish status
// export const togglePublishBlog = asyncHandler(async (req, res) => {
//   const blog = await Blog.findById(req.params.id);
//   if (!blog) throw new Error("Blog not found");

//   blog.isPublished = !blog.isPublished;
//   await blog.save();

//   res.status(200).json({
//     success: true,
//     message: "Publish status toggled",
//     isPublished: blog.isPublished,
//   });
// });

// // @desc    Get published blogs (public)
// export const getAllPublishedBlogs = asyncHandler(async (req, res) => {
//   const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
//   res.json(blogs);
// });

// // @desc    Get published blog by slug (public)
// export const getPublishedBlogBySlug = asyncHandler(async (req, res) => {
//   const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
//   if (!blog) throw new Error("Blog not found or not published");
//   res.json(blog);
// });

// // @desc    Like/Unlike a blog
// export const likeBlog = asyncHandler(async (req, res) => {
//   const blog = await Blog.findById(req.params.id);
//   if (!blog || !blog.isPublished) throw new Error("Blog not found or not published");

//   const userId = req.user._id;
//   const alreadyLiked = blog.likes.includes(userId);

//   if (alreadyLiked) {
//     blog.likes.pull(userId);
//   } else {
//     blog.likes.push(userId);
//   }

//   await blog.save();
//   res.json({ liked: !alreadyLiked, likesCount: blog.likes.length });
// });



import Blog from "../../models/blogModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";

// @desc    Create a new blog
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // If title or content is missing, throw an error
  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const slug = slugify(title, { lower: true, strict: true });

  const blog = new Blog({ ...req.body, slug });
  await blog.save();

  res.status(201).json({
    success: true,
    message: "Blog created successfully!",
    blog,
  });
});

// @desc    Get all blogs (Admin Only)
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    blogs,
  });
});

// @desc    Get blog by slug
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.status(200).json({
    success: true,
    message: "Blog found",
    blog,
  });
});

// @desc    Update a blog
export const updateBlog = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (title) {
    req.body.slug = slugify(title, { lower: true, strict: true });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedBlog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    updatedBlog,
  });
});

// @desc    Delete a blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  if (!deletedBlog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// @desc    Toggle publish status
export const togglePublishBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  blog.isPublished = !blog.isPublished;
  await blog.save();

  res.status(200).json({
    success: true,
    message: `Publish status toggled to ${blog.isPublished ? 'published' : 'unpublished'}`,
    isPublished: blog.isPublished,
  });
});

// @desc    Get published blogs (public)
export const getAllPublishedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: "Published blogs fetched successfully",
    blogs,
  });
});

// @desc    Get published blog by slug (public)
export const getPublishedBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found or not published");
  }
  res.status(200).json({
    success: true,
    message: "Published blog found",
    blog,
  });
});

// @desc    Like/Unlike a blog
export const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || !blog.isPublished) {
    res.status(404);
    throw new Error("Blog not found or not published");
  }

  const userId = req.user._id; // Assume the user is authenticated
  const alreadyLiked = blog.likes.includes(userId);

  // Toggle like/unlike
  if (alreadyLiked) {
    blog.likes.pull(userId); // If already liked, remove the user
  } else {
    blog.likes.push(userId); // If not liked, add the user
  }

  await blog.save();
  res.status(200).json({
    success: true,
    liked: !alreadyLiked,
    likesCount: blog.likes.length,
  });
});
