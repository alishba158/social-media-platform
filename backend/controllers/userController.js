const User = require('../models/User');
const Post = require('../models/Post');

// @desc User profile get karo (uske posts ke sath)
// @route GET /api/users/:id
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ user: req.params.id })
      .populate('user', 'name profilePic')
      .populate('comments.user', 'name profilePic')
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Bio update karo
// @route PUT /api/users/:id
const updateProfile = async (req, res) => {
  const { bio, profilePic } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bio = bio ?? user.bio;
    user.profilePic = profilePic ?? user.profilePic;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getUserProfile, updateProfile };