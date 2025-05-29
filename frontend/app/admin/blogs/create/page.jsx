// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/Input";
// import  Textarea  from "@/components/ui/Textarea";
// import  {Button}  from "@/components/ui/button";
// import { toast } from "react-hot-toast"; // Optional, for toast notifications
// import { createBlogAPI } from "@/utils/api"; // Your API function

// const CreateBlogPage = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     coverImage: null, // For image support
//   });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "coverImage") {
//       setFormData((prev) => ({ ...prev, coverImage: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const body = new FormData();
//       body.append("title", formData.title);
//       body.append("content", formData.content);
//       if (formData.coverImage) {
//         body.append("coverImage", formData.coverImage);
//       }

//       await createBlogAPI(body); // API handles FormData
//       toast.success("Blog created successfully!");
//       router.push("/admin/blogs");
//     } catch (error) {
//       toast.error("Failed to create blog!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">📝 Create New Blog</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <Input
//           name="title"
//           placeholder="Enter blog title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <Textarea
//           name="content"
//           placeholder="Write your blog content here..."
//           rows={10}
//           value={formData.content}
//           onChange={handleChange}
//           required
//         />

//         {/* Optional: Rich Text Editor can replace this later */}

//         <div>
//           <label className="block mb-2 text-sm font-medium">Cover Image (optional)</label>
//           <Input type="file" name="coverImage" accept="image/*" onChange={handleChange} />
//         </div>

//         <div className="flex gap-4">
//           <Button type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Blog"}
//           </Button>
//           <Button type="button" variant="outline" onClick={() => router.back()}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateBlogPage;
