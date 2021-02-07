const express = require("express");
const router = express.Router();
const { follow, unfollow, newsfeed, editUserProfile, getUser, getUsers } = require("../routeControllers/user");
const { shieldUser } = require("../middlewares/authSignin");

router.route("/users").get(shieldUser, getUsers);
router.route("/:id/follow").get(shieldUser, follow);
router.route("/:id/unfollow").get(shieldUser, unfollow);
router.route("/:username").put(shieldUser, editUserProfile);
router.route("/newsfeed").get(shieldUser, newsfeed);
router.route("/:username").get(shieldUser, getUser);

module.exports = router;