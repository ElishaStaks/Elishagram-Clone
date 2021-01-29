const express = require("express");
const router = express.Router();
const { follow, unfollow, newsfeed, editUserProfile } = require("../routeControllers/user");
const { shieldUser } = require("../middlewares/authSignin");

router.route("/").put(shieldUser, editUserProfile);
router.route("/newsfeed").get(shieldUser, newsfeed);
router.route("/:id/follow").get(shieldUser, follow);
router.route("/:id/unfollow").get(shieldUser, unfollow);

module.exports = router;