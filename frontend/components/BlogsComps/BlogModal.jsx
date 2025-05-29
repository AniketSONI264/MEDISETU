


// // // components/admin/blog/BlogModal.jsx
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/Input";
// // import Textarea from "@/components/ui/Textarea";
// // import { Button } from "@/components/ui/button";
// // import { useState, useEffect } from "react";

// // const BlogModal = ({ isOpen, onClose, blog, onSubmit, refetch }) => {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     content: "",
// //     type: "text",
// //     tags: "",
// //     metaDescription: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     if (isOpen && blog) {
// //       setFormData({
// //         title: blog.title || "",
// //         content: blog.content || "",
// //         type: blog.type || "text",
// //         tags: blog.tags?.join(", ") || "",
// //         metaDescription: blog.metaDescription || "",
// //       });
// //     } else {
// //       setFormData({ title: "", content: "", type: "text", tags: "", metaDescription: "" });
// //     }
// //   }, [isOpen, blog]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const validateForm = () => {
// //     const errs = {};
// //     if (!formData.title.trim()) errs.title = "Title is required.";
// //     if (!formData.content.trim()) errs.content = "Content is required.";
// //     setErrors(errs);
// //     return Object.keys(errs).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;
// //     setLoading(true);
// //     try {
// //       const dataToSend = {
// //         ...formData,
// //         tags: formData.tags.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean),
// //       };
// //       if (blog) await onSubmit(blog._id, dataToSend);
// //       else await onSubmit(dataToSend);
// //       refetch();
// //       onClose();
// //     } catch (err) {
// //       console.error("Blog submission failed", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="max-w-2xl">
// //         <DialogHeader>
// //           <DialogTitle>{blog ? "Edit Blog" : "Create New Blog"}</DialogTitle>
// //         </DialogHeader>
// //         <div className="space-y-4">
// //           <Input
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             placeholder="Enter blog title"
// //             className="w-full"
// //           />
// //           {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}

// //           <Textarea
// //             name="content"
// //             value={formData.content}
// //             onChange={handleChange}
// //             placeholder="Enter blog content..."
// //             className="min-h-[120px]"
// //           />
// //           {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}

// //           <Input
// //             name="tags"
// //             value={formData.tags}
// //             onChange={handleChange}
// //             placeholder="Enter tags, separated by commas"
// //           />

// //           <Textarea
// //             name="metaDescription"
// //             value={formData.metaDescription}
// //             onChange={handleChange}
// //             placeholder="Meta description for SEO (max 160 chars)"
// //             maxLength={160}
// //           />

// //           <div className="flex justify-end">
// //             <Button onClick={handleSubmit} disabled={loading}>
// //               {loading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
// //             </Button>
// //           </div>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default BlogModal;




// "use client";

// import { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
// import  {Input}  from "@/components/ui/Input";
// import  {Button}  from "@/components/ui/button";
// import  Textarea from "@/components/ui/Textarea";
// import { Loader2 } from "lucide-react";

// const BlogModal = ({ isOpen, onClose, blog, onSubmit, refetch }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     tags: "",
//     category: "",
//     metaDescription: "",
//     type: "text",
//   });

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (isOpen && blog) {
//       setFormData({
//         title: blog.title || "",
//         content: blog.content || "",
//         tags: blog.tags?.join(", ") || "",
//         category: blog.category || "",
//         metaDescription: blog.metaDescription || "",
//         type: blog.type || "text",
//       });
//     } else {
//       setFormData({
//         title: "",
//         content: "",
//         tags: "",
//         category: "",
//         metaDescription: "",
//         type: "text",
//       });
//     }
//   }, [isOpen, blog]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (["text", "mixed"].includes(formData.type) && !formData.content.trim()) newErrors.content = "Content is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         tags: formData.tags.split(",").map((tag) => tag.trim().toLowerCase()),
//       };

//       blog ? await onSubmit(blog._id, payload) : await onSubmit(payload);
//       refetch();
//       onClose();
//     } catch (err) {
//       console.error("Blog submission failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <Dialog open={isOpen} onOpenChange={onClose}>
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>

//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>{blog ? "Edit Blog" : "New Blog"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid grid-cols-1 gap-4">
//           <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

//           <Textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} rows={6} />
//           {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}

//           <Input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} />
//           <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
//           <Input name="metaDescription" placeholder="Meta Description (max 160 chars)" value={formData.metaDescription} onChange={handleChange} />

//           <div className="flex justify-end">
//             <Button onClick={handleSubmit} disabled={loading}>
//               {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
//               {blog ? "Update" : "Create"} Blog
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BlogModal;







// // @/components/BlogsComps/BlogModal.jsx
// "use client";
// import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// import CreateBlogForm from "./BlogForm"; // ⬅️ Import the form component

// const BlogModal = ({ isOpen, blog, onSubmit, onClose }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl p-0">
//         <DialogHeader className="px-6 pt-6">
//           <h2 className="text-xl font-semibold">
//             {blog ? "Edit Blog" : "Create New Blog"}
//           </h2>
//         </DialogHeader>
//         <div className="px-6 pb-6">
//           <CreateBlogForm
//             onSubmit={onSubmit}
//             initialData={blog} // ⬅️ Send data for editing
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BlogModal;



// components/BlogFormModal.jsx

import React from "react";
import { X } from "lucide-react"; // for close icon
import CreateBlogForm from "./BlogForm"; // Your actual form component

const BlogFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render modal at all if closed

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create New Blog</h2>
          <p className="text-sm text-gray-500">Fill the details to publish.</p>
        </div>

        {/* Blog Form */}
        <CreateBlogForm />
      </div>
    </div>
  );
};

export default BlogFormModal;
