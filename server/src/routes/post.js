const express = require("express");
const router = express.Router();
const { getPost, getPosts, addPost, deletePost, likePost, addComment, deleteComment } = require("../routeControllers/post");
const { shieldUser } = require("../middlewares/authSignin");

router.route("/posts").get(getPosts).post(shieldUser, addPost);
router.route("/:id").get(shieldUser, getPost).delete(shieldUser, deletePost);
router.route("/:id/like").get(shieldUser, likePost);
router.route("/:id/comments").post(shieldUser, addComment);
router.route("/:id/comments/:commentId").delete(shieldUser, deleteComment);

module.exports = router;