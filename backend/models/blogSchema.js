const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: [true, 'Blog name is required'],
        trim: true,
        unique: true,
        minlength: [5, 'Blog name must be at least 5 characters long'],
    },
    text: {
        type: String,
        required: [true, 'Blog Text is required'],
        trim: true,
        minlength: [10, 'Blog Text must be at least 10 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Blog image URL is required'],
        trim: true,
        unique: true
    },
}, {
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;