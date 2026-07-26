const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  likePost,
  addComment,
  deletePost,
} = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getPosts);
router.put('/:id/like', likePost);
router.post('/:id/comment', addComment);
router.delete('/:id', deletePost);

module.exports = router;