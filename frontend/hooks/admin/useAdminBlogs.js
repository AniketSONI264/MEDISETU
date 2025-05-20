// // hooks/admin/useAdminBlogs.js
// import { useEffect, useState } from "react";
// import API from "@/utils/api";

// const useAdminBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchBlogs = async () => {
//     try {
//       const res = await API.get("/admin/blogs");
//       setBlogs(res.data.blogs || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch blogs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return { blogs, loading, error, refetch: fetchBlogs };
// };

// export default useAdminBlogs;



// hooks/admin/useAdminBlogs.js
import { useEffect, useState } from "react";
import API from "@/utils/api";

const useAdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/admin/blogs");
      setBlogs(res.data.blogs || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData) => {
    try {
      const res = await API.post("/admin/blogs", blogData);
      await fetchBlogs();
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Failed to create blog.");
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      const res = await API.put(`/admin/blogs/${id}`, blogData);
      await fetchBlogs();
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Failed to update blog.");
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await API.delete(`/admin/blogs/${id}`);
      await fetchBlogs();
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Failed to delete blog.");
    }
  };

  const togglePublishBlog = async (id) => {
    try {
      const res = await API.patch(`/admin/blogs/${id}/toggle`);
      await fetchBlogs();
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Failed to toggle publish status.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    togglePublishBlog,
  };
};

export default useAdminBlogs;
