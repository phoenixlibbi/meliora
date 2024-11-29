const Blog = require("../models/blogSchema");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { blogName, text } = req.body;

    let image = "";
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/uploads/blogs/${
        req.file.filename
      }`;
    }

    const newblog = new Blog({
      blogName,
      text,
      image,
    });

    const savedblog = await newblog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: savedblog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const { blogName, text } = req.body;
    const updateData = { blogName, text };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get(
        "host"
      )}/images/uploads/blogs/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deletedblog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedblog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json({ message: "blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};