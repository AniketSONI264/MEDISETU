'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import  Textarea  from '@/components/ui/Textarea';
import  Label  from '@/components/ui/Label';
import { Select, SelectItem } from '@/components/ui/Select';
import toast from 'react-hot-toast';

const cloudName = 'dr10kpkc4';
const uploadPreset = 'blogs_preset';

const CreateBlogForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState(['']);
  const [readingTime, setReadingTime] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const isEdit = Boolean(initialData && initialData._id);
  const categoryOptions = [
    { value: 'tech', label: 'Tech' },
    { value: 'health', label: 'Health' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'education', label: 'Education' },
  ];
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setAuthor(initialData.author || '');
      setCategory(initialData.category || '');
      setTags(initialData.tags || ['']);
      setReadingTime(initialData.readingTime || '');
      setStatus(initialData.status || 'draft');
      setImageUrl(initialData.image || '');
      setVideoUrl(initialData.video || '');
    }
  }, [initialData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success('Image uploaded!');
      } else {
        toast.error('Image upload failed.');
      }
    } catch (err) {
      toast.error('Cloudinary error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('resource_type', 'video');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setVideoUrl(data.secure_url);
        toast.success('Video uploaded!');
      } else {
        toast.error('Video upload failed.');
      }
    } catch (err) {
      toast.error('Video upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTagField = () => {
    setTags([...tags, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !author || !category || !imageUrl) {
      toast.error('Please fill all required fields.');
      return;
    }

    const blogData = {
      title,
      content,
      author,
      category,
      tags: tags.filter((tag) => tag.trim() !== ''),
      readingTime,
      image: imageUrl,
      video: videoUrl,
      status,
      createdAt: isEdit ? initialData.createdAt : new Date().toISOString(),
    };

    onSubmit(blogData);

    if (!isEdit) {
      setTitle('');
      setContent('');
      setAuthor('');
      setCategory('');
      setTags(['']);
      setReadingTime('');
      setImageUrl('');
      setVideoUrl('');
      setStatus('draft');
      toast.success('Blog submitted!');
    } else {
      toast.success('Blog updated!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-xl rounded-xl max-w-4xl mx-auto mt-10">
      <div>
        <Label>Blog Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title" />
      </div>

      <div>
        <Label>Content</Label>
        <Textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your content..." />
      </div>

      <div>
        <Label>Author</Label>
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" />
      </div>

      <div>
        <Label>Category</Label>
        <Select   options={categoryOptions  ?? []} value={category} onChange={setCategory}>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Wellness">Wellness</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="AI">AI</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </Select>
      </div>

      <div>
        <Label>Tags</Label>
        {tags.map((tag, index) => (
          <Input
            key={index}
            className="mb-2"
            value={tag}
            onChange={(e) => handleTagChange(index, e.target.value)}
            placeholder={`Tag ${index + 1}`}
          />
        ))}
        <Button type="button" onClick={addTagField} variant="secondary" size="sm">
          + Add Tag
        </Button>
      </div>

      <div>
        <Label>Reading Time (mins)</Label>
        <Input type="number" min={1} value={readingTime} onChange={(e) => setReadingTime(e.target.value)} />
      </div>

      <div>
        <Label>Upload Blog Image</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p className="text-gray-500 text-sm">Uploading image...</p>}
        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-3 rounded-lg max-h-64 w-full object-cover" />}
      </div>

      <div>
        <Label>Upload Blog Video</Label>
        <Input type="file" accept="video/*" onChange={handleVideoUpload} />
        {uploading && <p className="text-gray-500 text-sm">Uploading video...</p>}
        {videoUrl && <video src={videoUrl} controls className="mt-3 rounded-lg max-h-64 w-full" />}
      </div>

      <div>
        <Label>Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </Select>
      </div>

      <Button type="submit" disabled={uploading}>
        {uploading ? 'Processing...' : isEdit ? 'Update Blog' : 'Create Blog'}
      </Button>
    </form>
  );
};

export default CreateBlogForm;
