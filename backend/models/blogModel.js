import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "authorType", // Could be 'User', 'Doctor', or 'Admin'
      required: true,
    },

    authorType: {
      type: String,
      enum: ["User", "Doctor", "Admin"],
      default: "Admin",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "createdByType", // Can be User, Doctor, or Admin
      required: true,
    },

    createdByType: {
      type: String,
      enum: ["User", "Doctor", "Admin"],
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image", "video", "mixed"], // added 'mixed' for text+media blogs
      default: "text",
    },

    content: {
      type: String,
      required: function () {
        return ["text", "mixed"].includes(this.type);
      },
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "Blog image",
        },
        caption: {
          type: String,
        },
      },
    ],

    video: {
      url: { type: String },
      thumbnail: { type: String },
      caption: { type: String },
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    category: {
      type: String,
      default: "General",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    metaDescription: {
      type: String,
      maxlength: 160,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    commentsEnabled: {
      type: Boolean,
      default: true,
    },

    commentCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
    },

    seoKeywords: [
      {
        type: String,
        trim: true,
      },
    ],

    readingTime: {
      type: Number, // in minutes
    },

    source: {
      type: String,
    },

    language: {
      type: String,
      default: "en",
    },
  },
  { timestamps: true }
);

// Auto-generate slug on save if not present
blogSchema.pre("save", function (next) {
  if (this.isNew && !this.slug) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const randomStr = Math.random().toString(36).substring(2, 6);
    this.slug = `${baseSlug}-${randomStr}`;
  }

  // Set publishedAt when isPublished becomes true for the first time
  if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Estimate reading time (avg. 200 words per minute)
  if (this.content) {
    const wordCount = this.content.trim().split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
