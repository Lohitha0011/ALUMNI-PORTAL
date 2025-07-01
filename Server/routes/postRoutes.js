const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, likePost } = require('../controllers/postsController');
const upload = require('../config/multerConfig'); // Multer configuration

// Route to create a new post (with image upload)
router.post('/create/:author', upload.single('image'), createPost);
router.post('/:postId/like/:alumniId', likePost);

// Route to get all posts (latest first)
router.get('/all-posts', getAllPosts);

module.exports = router;
