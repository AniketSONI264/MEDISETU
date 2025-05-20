// 'use client';

// import { useState, useEffect } from 'react';
// import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
// import Table from '@/components/ui/table';
// import SearchInput from '@/components/ui/SearchInput';
// import Select from '@/components/ui/select';
// import { Calendar, Eye, ThumbsUp, User } from 'lucide-react';
// import toast from 'react-hot-toast';

// export default function BlogsManagement() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState('all');

//   const columns = [
//     {
//       key: 'blog',
//       label: 'Blog',
//       render: (row) => (
//         <div className="flex items-center gap-3">
//           <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
//             <img
//               src={row.coverImage || '/default-blog.png'}
//               alt={row.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <p className="font-medium">{row.title}</p>
//             <p className="text-sm text-gray-500 line-clamp-2">{row.excerpt}</p>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: 'author',
//       label: 'Author',
//       render: (row) => (
//         <div className="flex items-center gap-2">
//           <User size={16} className="text-gray-500" />
//           <span>{row.author.name}</span>
//         </div>
//       ),
//     },
//     {
//       key: 'stats',
//       label: 'Stats',
//       render: (row) => (
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <Eye size={16} className="text-gray-500" />
//             <span className="text-sm">{row.views} views</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <ThumbsUp size={16} className="text-gray-500" />
//             <span className="text-sm">{row.likes} likes</span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: 'date',
//       label: 'Published',
//       render: (row) => (
//         <div className="flex items-center gap-2">
//           <Calendar size={16} className="text-gray-500" />
//           <span>{new Date(row.publishedAt).toLocaleDateString()}</span>
//         </div>
//       ),
//     },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (row) => (
//         <span
//           className={`px-3 py-1 rounded-full text-sm font-medium ${
//             row.status === 'published'
//               ? 'bg-green-100 text-green-600'
//               : row.status === 'draft'
//               ? 'bg-yellow-100 text-yellow-600'
//               : 'bg-red-100 text-red-600'
//           }`}
//         >
//           {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
//         </span>
//       ),
//     },
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (row) => (
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handleEditBlog(row.id)}
//             className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDeleteBlog(row.id)}
//             className="px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handleEditBlog = (id) => {
//     // Add navigation to edit blog page
//   };

//   const handleDeleteBlog = async (id) => {
//     try {
//       // Add API call to delete blog
//       toast.success('Blog deleted successfully');
//     } catch (error) {
//       toast.error('Failed to delete blog');
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const handleFilterChange = (value) => {
//     setFilter(value);
//   };

//   useEffect(() => {
//     // Add API call to fetch blogs
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <AdminPageWrapper title="Blogs Management">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </AdminPageWrapper>
//     );
//   }

//   return (
//     <AdminPageWrapper title="Blogs Management">
//       <div className="space-y-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <SearchInput
//               onSearch={handleSearch}
//               placeholder="Search blogs..."
//             />
//           </div>
//           <div className="w-full md:w-48">
//             <Select
//               options={[
//                 { value: 'all', label: 'All Blogs' },
//                 { value: 'published', label: 'Published' },
//                 { value: 'draft', label: 'Drafts' },
//                 { value: 'archived', label: 'Archived' },
//               ]}
//               value={filter}
//               onChange={handleFilterChange}
//               placeholder="Filter by status"
//             />
//           </div>
//         </div>

//         <Table
//           columns={columns}
//           data={blogs}
//           className="w-full"
//         />
//       </div>
//     </AdminPageWrapper>
//   );
// } 



// // app/admin/blogs/page.jsx
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import useAdminBlogs from "@/hooks/admin/useAdminBlogs";
// import BlogTable from "@/components/BlogsComps/BlogTable";
// import BlogModal from "@/components/BlogsComps/BlogModal.jsx";
// import { Loader2, PlusCircle } from "lucide-react";

// const AdminBlogPage = () => {
//   const { blogs, loading, error, refetch, createBlog, updateBlog, deleteBlog, togglePublishBlog } = useAdminBlogs();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   const handleCreate = () => {
//     setSelectedBlog(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (blog) => {
//     setSelectedBlog(blog);
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setSelectedBlog(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-6 mt-[20px] space-y-6 sm:mt-[150px] md:mt-[50px] sm:mt-10"> 
//       <div className="flex justify-between items-center mt-[50px]">
//         <h1 className="text-2xl font-bold">Manage Blogs</h1>
//         <Button onClick={handleCreate} className="flex items-center gap-2">
//           <PlusCircle className="w-5 h-5 md:w-8 md:h-8" /> New Blog
//         </Button>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin w-6 h-6" />
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <BlogTable
//           blogs={blogs}
//           onEdit={handleEdit}
//           onDelete={deleteBlog}
//           onTogglePublish={togglePublishBlog}
//         />
//       )}

//       <BlogModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         blog={selectedBlog}
//         onSubmit={selectedBlog ? updateBlog : createBlog}
//         refetch={refetch}
//       />
//     </div>
//   );
// };

// export default AdminBlogPage;







// "use client";

// import useAdminBlogs from "@/hooks/admin/useAdminBlogs";
// import BlogTable from "@/components/BlogsComps/BlogTable";
// import BlogForm from "@/components/BlogsComps/BlogForm";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const AdminBlogsPage = () => {
//   const { blogs, loading, createBlog } = useAdminBlogs();
//   const [showForm, setShowForm] = useState(false);

//   const handleCreate = async (data) => {
//     await createBlog(data);
//     setShowForm(false);
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Admin Blog Management</h1>
//         <Button onClick={() => setShowForm(true)}>+ New Blog</Button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <BlogTable blogs={blogs} />
//       )}

//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
//             <BlogForm onSubmit={handleCreate} onClose={() => setShowForm(false)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlogsPage;



// "use client";

// import useAdminBlogs from "@/hooks/admin/useAdminBlogs";
// import BlogTable from "@/components/BlogsComps/BlogTable";
// import BlogModal from "@/components/BlogsComps/BlogModal";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const AdminBlogsPage = () => {
//   const {
//     blogs,
//     loading,
//     createBlog,
//     updateBlog,
//     deleteBlog,
//     togglePublish,
//   } = useAdminBlogs();

//   const [showModal, setShowModal] = useState(false);
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   const handleCreate = async (data) => {
//     console.log("Button Clicked ...", data)
//     await createBlog(data);
//     setShowModal(false);
//     setSelectedBlog(null);
//   };

//   const handleEdit = async (data) => {
//     await updateBlog(selectedBlog?._id, data);
//     setShowModal(false);
//     setSelectedBlog(null);
//   };

//   const handleOpenCreate = () => {
//     setSelectedBlog(null);
//     setShowModal(true);
//   };

//   const handleOpenEdit = (blog) => {
//     setSelectedBlog(blog);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setSelectedBlog(null);
//   };

//   return (
//     <div className="p-4 space-y-4 mt-[100px]">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Admin Blog Management</h1>
//         <Button onClick={handleOpenCreate}>+ New Blog</Button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <BlogTable
//           blogs={blogs}
//           onEdit={handleOpenEdit}
//           onDelete={deleteBlog}
//           onTogglePublish={togglePublish}
//         />
//       )}

//       {/* {showModal && (
//         // <BlogModal
//         //   mode={selectedBlog ? "edit" : "create"}
//         //   initialData={selectedBlog}
//         //   onSubmit={selectedBlog ? handleEdit : handleCreate}
//         //   onClose={handleClose}
//         // />

//         <BlogModal
//           isOpen={showModal}
//           blog={selectedBlog}
//           onSubmit={selectedBlog ? handleEdit : handleCreate}
//           onClose={handleClose}
//         />

//       )} */}
//       <BlogModal
//         isOpen={showModal}
//         blog={selectedBlog}
//         onSubmit={selectedBlog ? handleEdit : handleCreate}
//         onClose={handleClose}
//       />

//     </div>
//   );
// };

// export default AdminBlogsPage;


"use client";

import useAdminBlogs from "@/hooks/admin/useAdminBlogs";
import BlogTable from "@/components/BlogsComps/BlogTable";
import BlogFormModal from "@/components/BlogsComps/BlogModal"; // <- Updated to use raw modal
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminBlogsPage = () => {
  const {
    blogs,
    loading,
    createBlog,
    updateBlog,
    deleteBlog,
    togglePublish,
  } = useAdminBlogs();

  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleCreate = async (data) => {
    console.log("Creating blog:", data);
    await createBlog(data);
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleEdit = async (data) => {
    console.log("Editing blog:", selectedBlog?._id, data);
    await updateBlog(selectedBlog?._id, data);
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleOpenCreate = () => {
    setSelectedBlog(null);
    setShowModal(true);
  };

  const handleOpenEdit = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="p-4 space-y-4 mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Blog Management</h1>
        <Button onClick={handleOpenCreate}>+ New Blog</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <BlogTable
          blogs={blogs}
          onEdit={handleOpenEdit}
          onDelete={deleteBlog}
          onTogglePublish={togglePublish}
        />
      )}

      <BlogFormModal
        isOpen={showModal}
        blog={selectedBlog}
        onSubmit={selectedBlog ? handleEdit : handleCreate}
        onClose={handleClose}
      />
    </div>
  );
};

export default AdminBlogsPage;
