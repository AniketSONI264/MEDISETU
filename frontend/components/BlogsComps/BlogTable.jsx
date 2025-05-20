// // components/admin/blog/BlogTable.jsx
// import { Button } from "@/components/ui/button";
// import  Table from "@/components/ui/table";
// import { Edit, Trash, Eye, EyeOff } from "lucide-react";
// import moment from "moment";

// const BlogTable = ({ blogs, onEdit, onDelete, onTogglePublish }) => {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableCell>Title</TableCell>
//           <TableCell>Slug</TableCell>
//           <TableCell>Status</TableCell>
//           <TableCell>Date</TableCell>
//           <TableCell className="text-right">Actions</TableCell>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {blogs.map((blog) => (
//           <TableRow key={blog._id}>
//             <TableCell>{blog.title}</TableCell>
//             <TableCell className="text-muted-foreground text-sm">{blog.slug}</TableCell>
//             <TableCell>
//               <span
//                 className={`px-2 py-1 text-xs rounded-full font-semibold ${
//                   blog.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {blog.isPublished ? "Published" : "Draft"}
//               </span>
//             </TableCell>
//             <TableCell>{moment(blog.createdAt).format("LLL")}</TableCell>
//             <TableCell className="flex justify-end gap-2">
//               <Button size="icon" variant="ghost" onClick={() => onTogglePublish(blog._id)}>
//                 {blog.isPublished ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </Button>
//               <Button size="icon" variant="ghost" onClick={() => onEdit(blog)}>
//                 <Edit className="w-5 h-5" />
//               </Button>
//               <Button size="icon" variant="ghost" onClick={() => onDelete(blog._id)}>
//                 <Trash className="w-5 h-5 text-red-500" />
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default BlogTable;


// // components/admin/blog/BlogTable.jsx
// import { Button } from "@/components/ui/button";
// import Table from "@/components/ui/table";
// import { Edit, Trash, Eye, EyeOff } from "lucide-react";
// import moment from "moment";

// const BlogTable = ({ blogs, onEdit, onDelete, onTogglePublish }) => {
//   const columns = [
//     {
//       key: "title",
//       label: "Title",
//     },
//     {
//       key: "slug",
//       label: "Slug",
//       render: (row) => <span className="text-muted-foreground text-sm">{row.slug}</span>,
//     },
//     {
//       key: "isPublished",
//       label: "Status",
//       render: (row) => (
//         <span
//           className={`px-2 py-1 text-xs rounded-full font-semibold ${
//             row.isPublished
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {row.isPublished ? "Published" : "Draft"}
//         </span>
//       ),
//     },
//     {
//       key: "createdAt",
//       label: "Date",
//       render: (row) => moment(row.createdAt).format("LLL"),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       render: (row) => (
//         <div className="flex justify-end gap-2">
//           <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onTogglePublish(row._id); }}>
//             {row.isPublished ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//           </Button>
//           <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onEdit(row); }}>
//             <Edit className="w-5 h-5" />
//           </Button>
//           <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onDelete(row._id); }}>
//             <Trash className="w-5 h-5 text-red-500" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       data={blogs}
//       sortable
//       // You can enable this if needed
//       // selectable
//       // onSelectionChange={(selectedIds) => console.log(selectedIds)}
//     />
//   );
// };

// export default BlogTable;






// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import BlogActions from "./BlogActions";

// const BlogTable = ({ blogs }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto border-collapse border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">Title</th>
//             <th className="border px-4 py-2">Author</th>
//             <th className="border px-4 py-2">Published</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogs.map((blog) => (
//             <tr key={blog._id}>
//               <td className="border px-4 py-2">{blog.title}</td>
//               <td className="border px-4 py-2">{blog.author}</td>
//               <td className="border px-4 py-2">
//                 {blog.isPublished ? "✅" : "❌"}
//               </td>
//               <td className="border px-4 py-2">
//                 <BlogActions blog={blog} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default BlogTable;


import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Edit, Trash, Eye, EyeOff } from "lucide-react";
import moment from "moment";

const BlogTable = ({ blogs, onEdit, onDelete, onTogglePublish }) => {
  const columns = [
    {
      key: "title",
      label: "Title",
      render: (row) => <span className="font-semibold text-primary truncate max-w-[200px]">{row.title}</span>,
    },
    {
      key: "authorType",
      label: "Author Type",
      render: (row) => <span className="capitalize text-muted-foreground">{row.authorType}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (row) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          {row.type}
        </span>
      ),
    },
    {
      key: "isPublished",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => moment(row.createdAt).format("LLL"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onTogglePublish(row._id); }}>
            {row.isPublished ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onEdit(row); }}>
            <Edit className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onDelete(row._id); }}>
            <Trash className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={blogs} sortable className="rounded-xl shadow-sm" />;
};

export default BlogTable;