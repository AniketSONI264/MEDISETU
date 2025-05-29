
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
    <div className="p-4 space-y-4 mt-10git">
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
