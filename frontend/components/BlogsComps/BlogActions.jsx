import { useState } from "react";
import BlogForm from "./BlogForm";
import BlogDeleteDialog from "./BlogDelete";
import { useAdminBlogs } from "@/hooks/admin/useAdminBlogs";
import { Button } from "@/components/ui/button";

const BlogActions = ({ blog }) => {
  const { updateBlog, deleteBlog, togglePublishBlog } = useAdminBlogs();
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleUpdate = async (data) => {
    await updateBlog(blog._id, data);
    setShowForm(false);
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => setShowForm(true)}>✏️</Button>
      <Button size="sm" onClick={() => setConfirmDelete(true)}>🗑️</Button>
      <Button size="sm" onClick={() => togglePublishBlog(blog._id)}>
        {blog.isPublished ? "Unpublish" : "Publish"}
      </Button>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-full max-w-2xl shadow-lg">
            <BlogForm initialData={blog} onSubmit={handleUpdate} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <BlogDeleteDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => deleteBlog(blog._id)}
      />
    </div>
  );
};

export default BlogActions;
