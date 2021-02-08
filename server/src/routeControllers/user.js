const User = require("../models/User");
const Post = require("../models/Post");

exports.follow = async (req, res, next) => {
    // check if user exists by its id
    const user = await User.findById(req.params.id);

    // if user doesnt exist throw an error message
    if (!user) {
        return next({
            message: `No user found for ID ${req.params.id}`,
            statusCode: 404,
        });
    }

    // Throw error message if user tries to follow themselves
    if (req.params.id === req.user.id) {
        return next({
            message: "Following/ Unfollowing yourself is not allowed",
            statusCode: 400
        });
    }

      // only follow if the user is not following already
    if (user.followers.includes(req.user.id)) {
      return next({ message: "You are already following him", status: 400 });
    }

    await User.findByIdAndUpdate(req.params.id, {
        $push: {followers: req.user.id },
        $inc: { followersCount: 1 },
    });

    await User.findByIdAndUpdate(req.user.id, {
        $push: {following: req.params.id },
        $inc: { followingCount: 1 },
    });

    res.status(200).json({ success: true, data: {} });
    Promise.resolve((req, res, next)).catch(next);
};

exports.unfollow = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next({
      message: `No user found for ID ${req.params.id}`,
      statusCode: 404,
    });
  }

  // make the sure the user is not the logged in user
  if (req.params.id === req.user.id) {
    return next({ message: "You can't follow/unfollow yourself", status: 400 });
  }

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user.id },
    $inc: { followersCount: -1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id },
    $inc: { followingCount: -1 },
  });

  res.status(200).json({ success: true, data: {} });
  Promise.resolve((req, res, next)).catch(next);
};

exports.editUserProfile = async(req, res, next) => {
    const { fullname, username, email, bio, avatar} = req.body;

    const updateFields = {};

    // adding fields to object
    if (fullname){
      updateFields.fullname = fullname;
    }
    if (username){
      updateFields.username = username;
    }
    if (email){
      updateFields.email = email;
    }
    if (avatar){
      updateFields.avatar = avatar;
    }

    const user = await User.findByIdAndUpdate(
    req.user.id, 
    {
        $set: { ...updateFields, bio},
    },
    {
        new: true,
        isValid: true
    }).select("fullname username email bio avatar");

    res.status(200).json({ success: true, data: user });
    Promise.resolve((req, res, next)).catch(next);
};

exports.newsfeed = async (req, res, next) => {
    // requests the user that you are following
    const following = req.user.following;

    // find all the users 
    const users = await User.find()
    .where("_id")
    .in(following.concat([req.user.id]))
    .exec();

    const postIds = users.map((user) => user.posts).flat();

    const posts = await Post.find()
    .populate({
      path: "comments",
      select: "text",
      populate: { path: "user", select: "avatar fullname username" },
    })
    .populate({ path: "user", select: "avatar fullname username" })
    .sort("-createdAt")
    .where("_id")
    .in(postIds)
    .lean()
    .exec();

    posts.forEach((post) => {
        // is the loggedin user liked the post
        post.isLiked = false;
        const likes = post.likes.map((like) => like.toString());
        if (likes.includes(req.user.id)) {
            post.isLiked = true;
        }

        // is the post belongs to the loggedin user
        post.isMine = false;
        if (post.user._id.toString() === req.user.id) {
            post.isMine = true;
        }

        // is the comment belongs to the loggedin user
        post.comments.map((comment) => {
            comment.isCommentMine = false;
            if (comment.user._id.toString() === req.user.id) {
                comment.isCommentMine = true;
            }
        });
    });

    res.status(200).json({ success: true, data: posts });
    Promise.resolve((req, res, next)).catch(next);
};

exports.getUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .select("-password")
    .populate({ path: "posts", select: "files commentsCount likesCount" })
    .populate({ path: "followers", select: "avatar username fullname" })
    .populate({ path: "following", select: "avatar username fullname" })
    .lean()
    .exec();

  if (!user) {
    return next({
      message: `The user ${req.params.username} is not found`,
      statusCode: 404,
    });
  }

  user.isFollowing = false;
  const followers = user.followers.map((follower) => follower._id.toString());

  user.followers.forEach((follower) => {
    follower.isFollowing = false;
    if (req.user.following.includes(follower._id.toString())) {
      follower.isFollowing = true;
    }
  });

  user.following.forEach((user) => {
    user.isFollowing = false;
    if (req.user.following.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  if (followers.includes(req.user.id)) {
    user.isFollowing = true;
  }

  user.isMe = req.user.id === user._id.toString();

  res.status(200).json({ success: true, data: user });
  
  Promise.resolve((req, res, next)).catch(next);
};

exports.getUsers = async (req, res, next) => {
  let users = await User.find().select("-password").lean().exec();

  users.forEach((user) => {
    user.isFollowing = false;
    const followers = user.followers.map((follower) => follower._id.toString());
    if (followers.includes(req.user.id)) {
      user.isFollowing = true;
    }
  });

  users = users.filter((user) => user._id.toString() !== req.user.id);

  res.status(200).json({ success: true, data: users });
  
  Promise.resolve((req, res, next)).catch(next);
};