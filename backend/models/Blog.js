// models/Blog.js
import mongoose, { Schema, model } from 'mongoose';

const blogSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        category: {
            type: String,
            minLength: 3,
            maxLength: 20,
        },
        title: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        cover: {
            type: String,
            required: true,
        },
        readTime: {
            value: {
                type: String,
            },
            unit: {
                type: String,
            },
        },
        author: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    {
        collection: 'blog',
    }
);

const Blog = model('Blog', blogSchema);
export default Blog;
