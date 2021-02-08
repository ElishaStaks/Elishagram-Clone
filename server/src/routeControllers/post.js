const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.addPost = async (req, res, next) => {
    // requests the caption and uploaded files
    const { caption, files } = req.body;
    // requests the users id
    const user = req.user.id;

    // create post object with caption, uploaded files and user
    let post = await Post.create({ caption, files, user });

    // request user by id and do things with it
    await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: post._id },
        $inc: { postCount: 1 },
    });

    // populate post with user avatar, name and username when post is uploaded
    post = await post
        .populate({ path: "user", select: "avatar username fullname" })
        .execPopulate();

    res.status(200).json({ success: true, data: post });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.deletePost = async (req, res, next) => {
    // request post id
    const post = await Post.findById(req.params.id);

    // throw error message if theres no post found for that specific id
    if (!post) {
        return next({
        message: `No post found for id ${req.params.id}`,
        statusCode: 404,
        });
    }

    // checks if user doesnt own this post and thows an error message if that condition is met
    if (post.user.toString() !== req.user.id) {
        return next({
        message: "You are not authorized to delete this post",
        statusCode: 401,
        });
    }

    // request user id and removes the post if found user id
    await User.findByIdAndUpdate(req.user.id, {
        $pull: { posts: req.params.id },
        $inc: { postCount: -1 },
    });

    await post.remove();

    res.status(200).json({ success: true, data: {} });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.likePost = async (req, res, next) => {
    // make sure that the post exists
    const post = await Post.findById(req.params.id);

    // if post doesnt exist throw error message
    if (!post) {
        return next({
        message: `No post found for id ${req.params.id}`,
        statusCode: 404,
        });
    }

    // checks if the posts likes includes a like from the user id
    if (post.likes.includes(req.user.id)) {
        // finds the index of the user id in the likes array
        const index = post.likes.indexOf(req.user.id);
        // remove that index element
        post.likes.splice(index, 1);
        // subtract like count from post
        post.likesCount = post.likesCount - 1;
        await post.save();
    } else {
        // adds like from that user id into the array of likes
        post.likes.push(req.user.id);
        post.likesCount = post.likesCount + 1;
        await post.save();
    }

    res.status(200).json({ success: true, data: {} });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.addComment = async (req, res, next) => {
    // request post id
    const post = await Post.findById(req.params.id);

    // throw error message if post doesnt exist
    if (!post) {
        return next({
        message: `No post found for id ${req.params.id}`,
        statusCode: 404,
        });
    }

    // create a new object with Comment Schema
    let comment = await Comment.create({
        user: req.user.id,
        post: req.params.id,
        text: req.body.text,
    });

    // push id 
    post.comments.push(comment._id);
    post.commentsCount = post.commentsCount + 1;
    await post.save();

    comment = await comment
        .populate({ path: "user", select: "avatar username fullname" })
        .execPopulate();

    res.status(200).json({ success: true, data: comment });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.deleteComment = async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next({
        message: `No post found for id ${req.params.id}`,
        statusCode: 404,
        });
    }

    // find post id and the comment id
    const comment = await Comment.findOne({
        _id: req.params.commentId,
        post: req.params.id,
    });

    // throw error message if comment doesnt exist
    if (!comment) {
        return next({
        message: `No comment found for id ${req.params.id}`,
        statusCode: 404,
        });
    }

    // if the user does not own this comment throw error message
    if (comment.user.toString() !== req.user.id) {
        return next({
        message: "You are not authorized to delete this comment",
        statusCode: 401,
        });
    }

    // remove the comment from the post
    const index = post.comments.indexOf(comment._id);
    post.comments.splice(index, 1);
    post.commentsCount = post.commentsCount - 1;
    await post.save();

    await comment.remove();

    res.status(200).json({ success: true, data: {} });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.getPost = async (req, res, next) => {
    const post = await Post.findById(req.params.id)
        .populate({
        path: "comments",
        select: "text",
        populate: {
            path: "user",
            select: "username avatar",
        },
        })
        .populate({
        path: "user",
        select: "username avatar",
        })
        .lean()
        .exec();

    if (!post) {
        return next({
        message: `No post found for id ${req.params.id}`,
        statusCode: 404,
        });
    }

    // does the post belong to loggedin user?
    post.isMine = req.user.id === post.user._id.toString();

    // is the loggedin user liked the post?
    const likes = post.likes.map((like) => like.toString());
    post.isLiked = likes.includes(req.user.id);

    // is the comment on the post belongs to the logged in user?
    post.comments.forEach((comment) => {
        comment.isCommentMine = false;

        const userStr = comment.user._id.toString();
        if (userStr === req.user.id) {
        comment.isCommentMine = true;
        }
    });

    res.status(200).json({ success: true, data: post });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.getPosts = async (req, res, next) => {
    const posts = await Post.find();

    res.status(200).json({ success: true, data: posts });
    
    Promise.resolve((req, res, next)).catch(next);
};