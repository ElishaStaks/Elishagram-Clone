const express = require("express");
const router = express.Router();  // allows me to make api requests with extra validation handling
const { signin, signup, user } = require("../routeControllers/auth");
const { shieldUser } = require("../middlewares/authSignin");

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/user").get(shieldUser, user);

module.exports = router;