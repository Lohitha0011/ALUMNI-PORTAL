const AlumniPost = require('../models/AlumniPost');

// Save a post to the database with image
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const {author} = req.params; 

    // Create a new post object
    const newPost = new AlumniPost({
      author,
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    // If an image is uploaded, store its path
    if (req.file) {
      newPost.image = `/uploads/posts/${req.file.filename}`;
    }

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ error: 'Error creating post', details: err.message });
  }
};

// Fetch all posts, sorted by the latest first
const getAllPosts = async (req, res) => {
  try {
    const posts = await AlumniPost.find()
      .populate('author', 'au_name') // Populate author's name from the Alumni collection
      .sort({ createdAt: -1 });   // Sort by latest posts

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts', details: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const {alumniId} = req.params; 

   /*  if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    } */

    // Find the post by ID
    const post = await AlumniPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(alumniId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    } 

    // Add the user's ID to the likes array
    post.likes.push(alumniId);

    // Save the updated post
    await post.save();

    return res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost
};
