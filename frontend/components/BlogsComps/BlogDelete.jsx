const BlogDeleteDialog = ({ open, onClose, onConfirm }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
          <h2 className="text-lg font-semibold">Delete this blog?</h2>
          <p>This action cannot be undone.</p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogDeleteDialog;
  