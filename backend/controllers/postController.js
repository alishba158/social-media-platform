const Post = require('../models/Post');

// @desc Naya post banao
// @route POST /api/posts
const createPost = async (req, res) => {
  const { content, image, userId } = req.body;

  try {
    const post = await Post.create({
      user: userId,
      content,
      image,
    });

    const populatedPost = await post.populate('user', 'name profilePic');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Sab posts get karo (feed)
// @route GET /api/posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('user', 'name profilePic')
      .populate('comments.user', 'name profilePic')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Post ko like/unlike karo
// @route PUT /api/posts/:id/like
const likePost = async (req, res) => {
  const { userId } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Comment add karo
// @route POST /api/posts/:id/comment
const addComment = async (req, res) => {
  const { userId, text } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({ user: userId, text });
    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate('user', 'name profilePic')
      .populate('comments.user', 'name profilePic');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Post delete karo
// @route DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, likePost, addComment, deletePost };